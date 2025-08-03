import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        split:
        "border-none bg-[#AEE1F4] text-black font-semibold text-lg",
        split2:
         "border-none bg-gradient-to-r from-[#0A79B0] via-[#AEE1F4] to-[#AEE1F4] text-black font-semibold text-xl",
        channel:
        "h-14 bg-[#AEE1F4] text-[#0A4B7B] px-4 py-2 rounded-full text-2xl font-bold font-[League Spartan], sans-serif border-6 border-[#0A4B7B] pl-8",
        data:
        "bg-[#AEE1F4] text-black px-4 py-2 text-md rounded-full",
        title:
        "inset-0 flex items-center justify-center bg-[#B8D1E7] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight px-3 sm:px-4 py-1 sm:py-2 rounded-full",
        userData:
           "bg-[#AEE1F4] rounded-lg p-4 w-full text-right text-xs md:text-xl space-y-2",
        userData2:
       "bg-[#AEE1F4] text-black px-4 py-2 text-base sm:text-lg md:text-xl lg:text-2xl rounded-full",
        userData3:
        "text-black px-3 py-1 text-base sm:px-4 sm:py-2 sm:text-lg md:text-lg lg:text-xl rounded-full",
        userData4:
           "bg-[#AEE1F4] text-black px-4 py-2 text-2xl rounded-full",   
        userData5:
           "bg-[#AEE1F4] text-black px-4 py-2 text-base sm:text-lg md:text-xl lg:text-xl rounded-full",
        titleGradient: 
        "h-10 px-4 py-1 text-lg sm:h-11 sm:px-6 sm:text-xl bg-transparent border-none text-[#063346] font-black font-[UnifrakturCook] tracking-wide",

           text:
           "rounded-lg p-4 w-full text-right text-xl md:text-xl space-y-2",
                  
        }
        ,
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
