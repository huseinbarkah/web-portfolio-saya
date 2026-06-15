interface BadgeProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export function Badge({ children, color, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 text-xs font-medium
        rounded-badge border border-glass-border
        bg-glass text-foreground-muted
        ${className}
      `}
      style={color ? { borderColor: `${color}33`, color } : undefined}
    >
      {children}
    </span>
  )
}
