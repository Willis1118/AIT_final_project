
export default function Layout({ children, home }){ // have to specify name as children when access content between tags
    return(
        <>
            <h1>This is a Header</h1>
            <main> { children }</main>
            <h1>This is a footer</h1>
        </>
    )
}