import Fab from '@material-ui/core/Fab';
import PrintIcon from '@material-ui/icons/Print';
import React from 'react';
import BackImage from '../../assets/images/back.png';

const styles={
    parentDiv:{
        borderRadius:6,
        elevation:3,//how much comes away from screen
        backgroundImage: `url(${BackImage})`,
        shadowOffset:{width:1,height:1},
        shadowColor:'#333',
        shadowOpacity:0.3,
        marginHorizontal:4,
        marginVertical:6,
        shadowRadius:2,
        position:'relative',
        marginTop:10,
        paddingBottom: 40,
    },
    prescriptionDesign:{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%',
        height:400,
        position:'relative',
        backgroundColor:'#fff',
    },

    headerImage:{
        position:'relative',
        top:0,
        left:0, 
        width:'100%',
        height:'20%'
    }
    ,
    footerImage:{
        position:'absolute',
        bottom:0,
        left:0, 
        width:'100%',
        height:'20%'
    }
}

const { forwardRef, useRef, useImperativeHandle } = React;
const PDF =  forwardRef((props,ref)=>
{
  const [rows,setRows] = React.useState([])
  React.useEffect(() => {
      if(props.prescription_rows && props.prescription_rows.length > 0)
      {
        setRows([...props.prescription_rows])

      }

}, []);

  useImperativeHandle(ref, () => ({
    addRow(data) {
      setRows([...data]);
    },
    updateData(data) {
      setRows([...data]);
    }
}));
const printDiv = ()=>{
  var printContents = document.getElementById("printDiv").innerHTML;
  let w=window.open();

  w.document.write(printContents);
 
  w.print();
  w.close();
}
    return (
        <div className="mg20">


        {/* White Shadow Div Start */}
          <div style={styles.parentDiv} id="myDiv">
                <Fab 
                    color="primary"
                    aria-label="add"
                    onClick={()=>printDiv()}
                    >
                        <PrintIcon  />
                </Fab> 
              {/* Image Div Parent Start */}
              <div id="printDiv" style={styles.prescriptionDesign}>

                {props.header &&
                             <img  style={styles.headerImage}
                             src={URL.createObjectURL(props.header)}  /> }
                {/* Drugs List Start */}
                <div style={{display:'flex',flexDirection:'column',margin:40}}>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                      <span>Drug</span>
                      <span>Quantity Per Day</span>
                      <span>Duration</span>
                    </div>
                  {rows.map(row=>{
                    return (
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                      <span>{row.drugName}</span>
                      <span>{row.Quantity}</span>
                      <span>{row.Duration}</span>
                    </div>
                    )
                  })}
              </div>
              {/* Drugs List End */}
                {props.footer &&   <img  style={styles.footerImage}
              src={URL.createObjectURL(props.footer)}  /> 
                }

            </div>
            {/* Image Div Parent End */}


          </div>

      </div >
    );
})
export default PDF;