import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "h-11 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        bluehover: "h-10 px-4 py-1 text-base sm:h-11 sm:px-6 sm:text-xl bg-[#B8D1E7] text-[#2271B3] border-[#063346] border-4 rounded-md font-extrabold transition hover:bg-[#2271B3] hover:text-[#B8D1E7]",

        redhover:
          "h-11 bg-[#FDECEC] text-[#D64545] border-[#B33A3A] border-4 px-6 py-1 rounded-md text-xl font-extrabold transition hover:bg-[#D64545] hover:text-[#FDECEC]",
        bluehover3:
          "h-11   px-6 py-1 rounded-md text-xl font-extrabold transition  hover:text-[#5E83BA]",

        bluehover2:
          "absolute bottom-4 right-4 bg-[#B8D1E7] text-[#2271B3] border-[#063346] border-4 px-6 py-1 rounded-md text-xl font-extrabold transition hover:bg-[#2271B3] hover:text-[#B8D1E7]",
        channel:
          "h-14 bg-[#AEE1F4] text-[#0A4B7B] px-4 py-2 rounded-full text-2xl font-bold font-[League Spartan], sans-serif border-6 border-[#0A4B7B] pl-8",
        imagebg:
          "relative flex items-center justify-center text-white text-4xl font-bold drop-shadow-lg absolute inset-0 bg-cover bg-center transition duration-300 group-hover:brightness-75 z-0",      
        imageIcon:
          "absolute bottom-0 right-[calc(50%-4rem)] bg-[#B8D1E7] border-[#063346] border-1 rounded-full p-1 shadow hover:bg-[#2271B3] hover:text-[#B8D1E7]",    
        
        },

          size: {
        default: " px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
