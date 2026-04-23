import React from "react";
import { Grid, GridItem } from "@/components/ui/Grid";
import { useUserStore } from "@/store";
import { Button } from "@/components/ui/button";
import useGetUserByID from "@/hooks/user/useGetUserByID";
import { useRouter } from "next/router";
import useCreateStripeAccountLink from "@/hooks/stripe/useCreateStripeAccountLink";
import { useSearchParams } from "next/navigation";
import { useDialog } from "@/hooks/useDialog";
import AccountStatusDialog from "@/components/shared/account-status-dialog";
import GWSLoader from "@/components/shared/gws-loader";
import useGetStripeDashboardLink from "@/hooks/stripe/useGetStripeDashboardLink";
import CustomTabs from "@/components/shared/custom-tabs";
import { TransactionCard } from "@/pageComponents/TransactionHistory/TransactionCards";
import useGetRegistryItemByRegistryID from "@/hooks/registry-item/useGetRegistryItemsByRegistryID";
import Typography from "@/components/ui/typography";
import { getFormattedDate } from "@/utilities/helpers/dateTime";
import useGetPaymentDetailsByConnectAccountId from "@/hooks/payment-detail/useGetPaymentDetailsByConnectAccountId";

function Billing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountStatus = searchParams.get("accountLinked");

  const { open, openDialog, closeDialog } = useDialog(false);

  React.useEffect(() => {
    if (accountStatus) {
      openDialog();
    }
  }, [accountStatus]);

  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: userData, isLoading } = useGetUserByID(user.id || 0);
  const { mutateAsync: getStripeAccountLink, isPending } =
    useCreateStripeAccountLink();
  const {
    mutateAsync: getStripeDashboardLink,
    isPending: isGettingDashboardLink,
  } = useGetStripeDashboardLink();

  const { data: registryItems, isLoading: isLoadingRegistryItems } =
    useGetRegistryItemByRegistryID(user.giftWellID || 0);
  const { data: paymentDetails, isLoading: isLoadingPayment } =
    useGetPaymentDetailsByConnectAccountId(userData?.stripe_account_id || "");

  const filteredRegistryItems = React.useMemo(
    () =>
      registryItems
        ?.filter((item) => item.is_claimed)
        .map((item) => {
          return {
            product_name: item.registry_product?.name,
            affiliate_link: item.registry_product?.affiliate_link,
            purchased_at: getFormattedDate(item.updated_at || ""),
            type: item.status,
          };
        }) || [],
    [registryItems]
  );

  const donations = React.useMemo(
    () =>
      paymentDetails?.map((payment) => ({
        title: `$${payment.amount} - ${payment.donation?.title}`,
        donorName: payment.cardholder_name || "Anonymous",
        amount: `$${payment.amount}`,
        date: getFormattedDate(payment.updated_at || ""),
        status: payment.status,
        transactionId: payment.stripe_id,
        platformFee: `$${payment.platform_fee}`,
        netAmount: `$${payment.recipient_amount}`,
      })),
    [paymentDetails]
  );

  const createStripeAccountLink = async () => {
    const accountLinks = await getStripeAccountLink({
      accountId: userData?.stripe_account_id || "",
    });

    router.push(accountLinks.url || "");
  };

  const getDashboardLink = async () => {
    const dashboardLink = await getStripeDashboardLink({
      accountId: userData?.stripe_account_id || "",
    });

    router.push(dashboardLink.url || "");
  };

  const isAccountLinked = Number(accountStatus) === 1;

  if (isLoading || isLoadingPayment || isLoadingRegistryItems) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-white lg:m-6 mx-4 my-2 p-6 rounded-sm w-[calc(100vw-6)] border-none">
        <GWSLoader loadingText="Loading transaction history" />
      </div>
    );
  }

  const tabs = [
    {
      value: "all",
      title: "All",
      description: "All your activity in one place",
      content: (
        <div className="space-y-4">
          {filteredRegistryItems.map((item, idx) => (
            <TransactionCard
              key={`purchase-${idx}`}
              type="purchase"
              productName={item.product_name || "Unknown Product"}
              date={item.purchased_at || ""}
              productLink={item.affiliate_link || "#"}
            />
          ))}

          {donations?.map((donation, idx) => (
            <TransactionCard
              key={`donation-${idx}`}
              type="donation"
              title={donation.title || ""}
              donorName={donation.donorName}
              amount={donation.amount}
              date={donation.date}
              status={donation.status}
              transactionId={donation.transactionId}
              platformFee={donation.platformFee}
              netAmount={donation.netAmount}
            />
          ))}

          {filteredRegistryItems.length === 0 && donations?.length === 0 && (
            <Typography className="text-gray-500">
              No support received yet.
            </Typography>
          )}
        </div>
      ),
    },
    {
      value: "purchases",
      title: "Purchases",
      description: "Your past product purchases",
      content: (
        <div className="space-y-4">
          {filteredRegistryItems.length > 0 ? (
            filteredRegistryItems.map((item, idx) => (
              <TransactionCard
                key={`purchase-${idx}`}
                type="purchase"
                productName={item.product_name || "Unknown Product"}
                date={item.purchased_at || ""}
                productLink={item.affiliate_link || "#"}
              />
            ))
          ) : (
            <Typography size="sm" className="text-gray-500">
              No gift recieved yet.
            </Typography>
          )}
        </div>
      ),
    },
    {
      value: "donations",
      title: "Donations",
      description: "Your charitable contributions",
      content: (
        <div className="space-y-4">
          {donations && donations?.length > 0 ? (
            donations?.map((donation, idx) => (
              <TransactionCard
                key={`donation-${idx}`}
                type="donation"
                title={donation.title || ""}
                donorName={donation.donorName}
                amount={donation.amount}
                date={donation.date}
                status={donation.status}
                transactionId={donation.transactionId}
                platformFee={donation.platformFee}
                netAmount={donation.netAmount}
              />
            ))
          ) : (
            <Typography size="sm" className="text-gray-500">
              No donation recieved yet.
            </Typography>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Grid className="bg-white md:mx-6 mx-2 md:p-6 p-3 rounded-sm w-[calc(100vw-6)] overflow-hidden relative">
        <GridItem>
          <div className="flex justify-end">
            {userData?.is_stripe_linked ? (
              <Button
                variant="secondary"
                onClick={getDashboardLink}
                disabled={isGettingDashboardLink}
              >
                View Stripe Dashboard
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={createStripeAccountLink}
                disabled={isPending}
              >
                {isPending ? "Please wait..." : "Link your account to stripe"}
              </Button>
            )}
          </div>
        </GridItem>
        <GridItem>
          <div className="">
            <CustomTabs
              tabs={tabs}
              defaultValue="all"
              tabStyles="justify-start gap-3 bg-transparent border-b w-full rounded-none pb-0"
            />
          </div>
        </GridItem>
      </Grid>
      {isAccountLinked && open && (
        <AccountStatusDialog
          open={open}
          closeDialog={() => {
            closeDialog();
            router.replace("/billing");
          }}
        />
      )}
    </>
  );
}

export default Billing;
