import {
  CheckCircle2,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { TaskPaymentTrigger } from "@/components/task-payment-provider";
import { mvpLoop, mvpModules } from "@/lib/data/mvp";

const moduleIcons = {
  check: CheckCircle2,
  rocket: Rocket,
  shield: ShieldCheck,
  sparkles: Sparkles,
  wallet: Wallet,
};

export function MvpModulesSection() {
  return (
    <section className="mvp-section mt-6">
      <div className="mvp-section-header">
        <div>
          <p className="mvp-eyebrow">First-principles MVP</p>
          <h2>XPhantom needs one complete user loop first.</h2>
          <p>
            The minimum product is not every dashboard feature. It is the shortest path from project discovery to
            wallet action and community follow-through.
          </p>
        </div>
        <div className="mvp-header-actions">
          <TaskPaymentTrigger className="mvp-primary-action">
            <Wallet className="h-4 w-4" />
            Start payment
          </TaskPaymentTrigger>
        </div>
      </div>

      <div className="mvp-loop" aria-label="MVP user loop">
        {mvpLoop.map((step, index) => (
          <div key={step} className="mvp-loop-step">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>

      <div className="mvp-module-grid">
        {mvpModules.map((module) => {
          const Icon = moduleIcons[module.icon] || CheckCircle2;
          return (
            <article key={module.id} className="mvp-module-card">
              <div className="mvp-module-topline">
                <div className="mvp-module-icon">
                  <Icon className="h-4 w-4" />
                </div>
                <span>{module.status}</span>
              </div>
              <h3>{module.title}</h3>
              <p className="mvp-principle">{module.principle}</p>
              <p className="mvp-outcome">{module.outcome}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
