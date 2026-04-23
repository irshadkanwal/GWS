"use client";

import React from "react";
import { Grid, GridItem } from "@/components/ui/Grid";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserTable from "./UserTable";
import useGetAllUsers from "@/hooks/user/useGetAllUsers";
import useGetAllRoles from "@/hooks/role/useGetAllRoles";
import { USER_ROLES } from "@/constants/constants";
import { SectionHeader } from "./SectionHeader";
import { SummaryCard } from "./SummaryCards";
import { SearchInput } from "./SearchInput";
import SummaryCardsSkeleton from "./SummaryCardsSkeleton";

function UsersPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [rolesFilter, setRolesFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const { data: allRoles } = useGetAllRoles();
  const { data: allUsers, isLoading } = useGetAllUsers();

  const caregiverRole = React.useMemo(
    () => allRoles?.find((role) => role.name === USER_ROLES.CAREGIVER),
    [allRoles]
  );
  const recipientRole = React.useMemo(
    () => allRoles?.find((role) => role.name === USER_ROLES.RECIPIENT),
    [allRoles]
  );
  const careGivers = React.useMemo(
    () => allUsers?.filter((user) => user.role_id === caregiverRole?.id),
    []
  );
  const recipients = React.useMemo(
    () => allUsers?.filter((user) => user.role_id === recipientRole?.id),
    [allUsers]
  );

  const rolesMap = React.useMemo(() => {
    if (!allRoles) return {};
    return allRoles.reduce((map, role) => {
      map[role.id] = role.name;
      return map;
    }, {} as Record<number, string>);
  }, [allRoles]);

  const filteredUsers = React.useMemo(() => {
    if (!allUsers) return [];

    return allUsers.filter((user) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      const email = user.email?.toLowerCase() || "";

      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        email.includes(searchQuery.toLowerCase());

      const matchesRole =
        rolesFilter === "all" || user.role_id === Number(rolesFilter);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !user.is_deleted) ||
        (statusFilter === "deleted" && user.is_deleted);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [allUsers, searchQuery, rolesFilter, statusFilter]);

  return (
    <Grid className="bg-white lg:m-6 mx-4 my-2 p-6 rounded-sm w-[calc(100vw-6)]">
      <SectionHeader title="All Users' Information" />
      {isLoading ? (
        <SummaryCardsSkeleton />
      ) : (
        <>
          <SummaryCard label="Total Users" count={allUsers?.length || 0} />
          <SummaryCard
            label="Recipients"
            count={recipients?.length || 0}
            colorClass="text-green-600"
          />
          <SummaryCard
            label="Caregivers"
            count={careGivers?.length || 0}
            colorClass="text-yellow-600"
          />

          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search User"
          />

          <GridItem className="lg:col-span-2 px-0">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <Filter size={20} className="mr-2" />
                <SelectValue placeholder="By Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
              </SelectContent>
            </Select>
          </GridItem>

          <GridItem className="lg:col-span-2 px-0">
            <Select value={rolesFilter} onValueChange={setRolesFilter}>
              <SelectTrigger className="w-full">
                <Filter size={20} className="mr-2" />
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">By Role</SelectItem>
                <SelectItem value={`${caregiverRole?.id}`}>
                  {caregiverRole?.name}
                </SelectItem>
                <SelectItem value={`${recipientRole?.id}`}>
                  {recipientRole?.name}
                </SelectItem>
              </SelectContent>
            </Select>
          </GridItem>
        </>
      )}

      <GridItem className="px-0">
        <UserTable
          usersData={filteredUsers}
          rolesMap={rolesMap}
          isLoading={isLoading}
        />
      </GridItem>
    </Grid>
  );
}

export default UsersPage;
