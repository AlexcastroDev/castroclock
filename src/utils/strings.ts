export const padStart = (width: Number, string: string, padding: string): string => {
    return (width <= string.length) ? string : padStart(width, `${padding}${string}`, padding)
}