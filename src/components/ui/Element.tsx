import React from "react"

export const Heading = ({children,className} : {children: React.ReactNode , className : string}) => {
    return(
        <h2 className={ `${className ? className : "" } md:text-4xl sm:text-3xl text-2xl text-yellow-600` } >{children}</h2>
    )
}

export const SectionHeading = ({children,className} : {children: React.ReactNode , className : string}) => {
    return(
        <h2 className={ `${className ? className : "" } md:text-5xl sm:text-4xl text-3xl font-bold text-yellow-600` } >{children}</h2>
    )
}
export const Title = ({children,className} : {children: React.ReactNode , className : string}) => {
    return(
        <h3 className={ `${className ? className : "" } md:text-2xl sm:text-xl text-sm ` } >{children}</h3>
    )
}
export const Paragraph = ({children,className} : {children: any , className : string}) => {
    return(
        <p className={ `${className ? className : "" }  text-base font-thin text-gray-700 ` } >{children}</p>
    )
}

export const Section = ({children,className} : {children: React.ReactNode , className? : string}) => {
    return(
        <section className={`${className ? className : ""} px-4 md:px-8 py-6 sm:py-8 lg:py-12 border-b bg-white my-2 rounded-3xl drop-shadow-lg`}>
                    {children}
        </section>
    )
}