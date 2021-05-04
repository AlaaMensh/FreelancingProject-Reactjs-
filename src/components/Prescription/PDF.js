import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
// import '../../styles/pdf.css';
const { forwardRef, useRef, useImperativeHandle } = React;
const PDF =  forwardRef((props,ref)=>
{
  const [data,setData] = React.useState([])
  useImperativeHandle(ref, () => ({
    addRow(row) {
      //alert(data)
        var max = 0
        if(data.length > 0)
        {
            max = data[data.length-1].id
        }
        console.log(row.drug)
        console.log(row)
        data.push({id:parseInt(max+1),drugName:row.drug.split(",")[1],drug:row.drug.split(",")[0],Quantity:row.quantity,Duration:row.duration});
        setData([...data]);
    },
    updateData(rows) {
        setData([...rows]);
    }
}));
const prinDiv = ()=>{
        var divContents = document.getElementById("pdf").innerHTML;
        var a = window.open('', '', 'height=500, width=500');
        a.document.write('<html>');
        a.document.write('<body>');
        a.document.write(divContents);
        a.document.write('</body></html>');
        a.document.close();
        a.print();
}
    return (
        <div>
        <div className="pdf" id="pdf">
            <table className="rtable">
            <thead>
                <tr>
                <th>Drug Name</th>
                <th>Quantity</th>
                <th>Duration</th>
                </tr>
            </thead>
            <tbody>
            {data.map(row=>{
                return (
                    <tr key={row.id}>
                    <td>{row.drugName}</td>
                    <td>{row.Quantity}</td>
                    <td>{row.Duration}</td>
                    </tr>
                )
            })}
            </tbody>
            </table>
        </div>
        <Button
            variant="contained"
            color="primary"
            size="large"
            style={{width:'420px',margin:10}}
            startIcon={<SaveIcon />}
            onClick={prinDiv}
          >
            Print
          </Button>
        </div>
    );
})
export default PDF;