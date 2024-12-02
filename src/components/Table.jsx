import React from 'react'

const Table = ({columns, matrix}) => {
  
  return (
    <table className="m-5 table-fixed font-medium border border-collapse border-slate-500">
        <TableHeader>
          <TabelRow>
            {
              columns?.map((column,index) => <DataHead key={index} className="p-2 border border-slate-600 bg-slate-500 text-white">{column}</DataHead>)
            }
          </TabelRow>
        </TableHeader>
        <TableBody>
          {
            matrix.map(
              (row,index) => 
              <TabelRow key={index}>
                {
                  row.map((cell,index) => <DataCell key={index} className="text-center border p-2 border-slate-600">{cell}</DataCell>)
                }
              </TabelRow>
            )
          }
          {
            matrix.length === 0 && <TabelRow>
              <DataCell className="text-center border p-2 border-slate-600" colSpan={columns.length}>No Data Available</DataCell>
            </TabelRow>
          }
        </TableBody>
    </table>
  )
}


function TableHeader({children, className}) {
  return <thead className={className}>{children}</thead>
}

function TableBody ({ children, className }){
  return <tbody className={className}>{children}</tbody>
}

function TabelRow({children, className}){
  return <tr className={className}> {children} </tr>
}

function DataCell({children,className,colSpan=1}){
  return <td className={className} colSpan={colSpan}> {children}</td>
}

function DataHead({children,className}){
  return <th className={className}>{children}</th>
}


export default Table