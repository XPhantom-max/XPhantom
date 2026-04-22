import { SiteInteractionsProvider } from "@/components/site-interactions-provider";
import { TaskPaymentProvider } from "@/components/task-payment-provider";

export function Providers({ children }) {
  return (
    <TaskPaymentProvider>
      <SiteInteractionsProvider>{children}</SiteInteractionsProvider>
    </TaskPaymentProvider>
  );
}
