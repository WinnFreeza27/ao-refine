export default function Background({child}) {
    return (
    <div className="bg-gradient-to-br from-bg-purple from-10% to-bg-purple-dark to-90% w-screen h-screen">
        {child}
    </div>
    )
}