
import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  icon?: React.ReactNode
  isLoading?: boolean
  footer?: React.ReactNode
  className?: string
  children: React.ReactNode
}

const DashboardCard = ({
  title,
  description,
  icon,
  isLoading = false,
  footer,
  className,
  children,
  ...props
}: DashboardCardProps) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden h-full transition-all hover:shadow-md",
        className
      )} 
      {...props}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span className="text-muted-foreground">{icon}</span>}
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            )}
          </div>
        </div>
        {description && !isLoading ? (
          <CardDescription>{description}</CardDescription>
        ) : description && isLoading ? (
          <Skeleton className="h-4 w-48 mt-1" />
        ) : null}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          children
        )}
      </CardContent>
      {footer && (
        <CardFooter className="border-t bg-muted/20 px-6 py-3">
          {isLoading ? <Skeleton className="h-4 w-32" /> : footer}
        </CardFooter>
      )}
    </Card>
  );
};

export { DashboardCard };
