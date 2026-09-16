interface ConditionalWrapperProps {
    childTrue: React.ReactNode,
    chlidFalse: React.ReactNode, 
    condition: boolean
}

export default function ConditionalWrapper({childTrue, chlidFalse, condition}: ConditionalWrapperProps) {
    if (condition) {
        return childTrue
    } else {
        return chlidFalse
    }
}