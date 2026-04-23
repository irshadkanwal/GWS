import React from "react";
import { Grid, GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import { Users, Newspaper, Package, CircleDollarSign } from "lucide-react";
import useGetAllArticles from "@/hooks/article/useGetAllArticles";
import useGetAllUsers from "@/hooks/user/useGetAllUsers";
import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import { BLOG_STATUS } from "@/constants/constants";
import { ROUTES } from "@/constants/routes";
import DetailsCard from "./DetailsCard";
import useGetAllPayments from "@/hooks/payment-detail/useGetAllPaymentDetails";

type Props = {};

function AdminDashboard({}: Props) {
  const { data: allArticles } = useGetAllArticles();
  const { data: users } = useGetAllUsers();
  const { data: products } = useGetAllProducts();
  const { data: allPayments } = useGetAllPayments();

  const totalPayment = React.useMemo(
    () =>
      allPayments?.reduce((total, payment) => total + (payment.amount || 0), 0),
    [allPayments]
  );

  const platformFeeTotal = React.useMemo(
    () =>
      allPayments?.reduce(
        (total, payment) => total + Number(payment.platform_fee || 0),
        0
      ) ?? 0,
    [allPayments]
  );

  const userData = {
    total: users?.length || 0,
    active: users?.filter((user) => !user.is_deleted)?.length || 0,
    deactivated: users?.filter((user) => user.is_deleted)?.length || 0,
  };

  const articleData = {
    total: allArticles?.length || 0,
    published:
      allArticles?.filter((article) => article.status === BLOG_STATUS.PUBLISHED)
        ?.length || 0,
    drafts:
      allArticles?.filter((article) => article.status === BLOG_STATUS.DRAFT)
        ?.length || 0,
  };

  const productData = {
    total: products?.length || 0,
  };

  const earnedFee = platformFeeTotal.toFixed(2);

  return (
    <Grid className="bg-white lg:m-6 mx-4 my-2 p-6 rounded-sm w-[calc(100vw-6)]">
      <GridItem className="py-0">
        <Typography size="xl" className="font-bold">
          Dashboard Overview
        </Typography>
      </GridItem>

      <GridItem>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DetailsCard
            title="Total Users"
            counts={userData.total}
            description={`${userData.active} active, ${userData.deactivated} deactivated`}
            visitLink={ROUTES.USERS.pathName}
            Icon={Users}
          />

          <DetailsCard
            title="Total Articles"
            counts={articleData.total}
            description={`${articleData.published} published, ${articleData.drafts} drafts`}
            visitLink={ROUTES.ARTICLES.pathName}
            Icon={Newspaper}
          />

          <DetailsCard
            title="Total Payments"
            counts={allPayments?.length || 0}
            description={`$${earnedFee} earned from $${totalPayment} in donations`}
            visitLink={ROUTES.PAYMENT_HISTORY.pathName}
            Icon={CircleDollarSign}
          />

          <DetailsCard
            title="Total Products"
            counts={productData.total}
            description=""
            visitLink={ROUTES.PRODUCTS.pathName}
            Icon={Package}
          />
        </div>
      </GridItem>
    </Grid>
  );
}

export default AdminDashboard;
