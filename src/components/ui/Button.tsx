import { type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { Link, type LinkProps } from '@tanstack/react-router'

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  iconRight?: ReactNode
  className?: string
  children: ReactNode
}

type ButtonAsButton = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type ButtonAsLink = ButtonBaseProps & { as: 'link'; to: string } & Partial<LinkProps>
type ButtonAsAnchor = ButtonBaseProps & { as: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

const sizeClasses = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
}

const variantClasses = {
  primary: 'bg-gradient-to-r from-accent to-accent-purple text-white shadow-glow-blue hover:shadow-glow-purple',
  secondary: 'border border-glass-border bg-glass text-foreground hover:bg-glass-hover hover:border-glass-border-hover',
  ghost: 'text-foreground-muted hover:text-foreground hover:bg-glass',
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    iconRight,
    className = '',
    children,
  } = props

  const classes = `
    inline-flex items-center justify-center font-medium
    rounded-pill transition-all duration-normal
    cursor-pointer select-none
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim()

  const inner = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </>
  )

  if (props.as === 'link') {
    const { as: _, variant: _v, size: _s, icon: _i, iconRight: _ir, ...linkRest } = props
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link {...(linkRest as any)} className={classes}>
          {inner}
        </Link>
      </motion.div>
    )
  }

  if (props.as === 'a') {
    const { as: _, variant: _v, size: _s, icon: _i, iconRight: _ir, ...anchorRest } = props
    return (
      <motion.a
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
        {...(anchorRest as any)}
      >
        {inner}
      </motion.a>
    )
  }

  const { as: _, variant: _v, size: _s, icon: _i, iconRight: _ir, ...btnRest } = props as ButtonAsButton
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
      {...(btnRest as any)}
    >
      {inner}
    </motion.button>
  )
}
