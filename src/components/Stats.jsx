import React from 'react'

const Stats = ({ stats }) => {
    return (
        <section className="p-6 dark:bg-gray-100 dark:text-gray-800">
            <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-5">
                {
                    stats.map(({ value, label },index) => <Stat key={index} value={value} label={label} />)
                }
            </div>
        </section>
    )
}

const Stat = ({ value, label }) => {
    return (
        <div className="flex flex-col justify-start m-2 lg:m-6">
            <p className="text-4xl font-bold leading-none lg:text-5xl text-purple-600">{value}</p>
            <p className="text-sm sm:text-base">{label}</p>
        </div>
    )
}

export default Stats