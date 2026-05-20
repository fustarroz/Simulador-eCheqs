import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SimulatorSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-7">
      <Card className="p-7 sm:p-9">
        <Skeleton className="h-3 w-24" />
        <div className="mt-7 space-y-3">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-2 w-full" />
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-11 w-full rounded-lg" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
        <Skeleton className="mt-4 h-11 w-full rounded-lg" />
      </Card>

      <Card className="bg-result-deep p-7 sm:p-9">
        <Skeleton className="h-3 w-32 bg-white/15" />
        <div className="mt-7 space-y-3">
          <Skeleton className="h-4 w-44 bg-white/15" />
          <Skeleton className="h-14 w-56 bg-white/15" />
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-28 w-full rounded-xl bg-white/10" />
          <Skeleton className="h-28 w-full rounded-xl bg-white/10" />
        </div>
      </Card>
    </div>
  );
}
