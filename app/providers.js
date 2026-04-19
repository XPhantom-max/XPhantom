import { DeveloperAdminProvider } from "@/components/developer-admin-provider";
import { SiteInteractionsProvider } from "@/components/site-interactions-provider";
import { TaskPaymentProvider } from "@/components/task-payment-provider";

export function Providers({ children }) {
  return (
    <DeveloperAdminProvider>
      <TaskPaymentProvider>
        <SiteInteractionsProvider>{children}</SiteInteractionsProvider>
      </TaskPaymentProvider>
    </DeveloperAdminProvider>
  );
}
