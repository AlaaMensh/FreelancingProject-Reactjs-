import Fab from '@material-ui/core/Fab';
import UploadIcon from '@material-ui/icons/CloudUploadRounded';
import PrintIcon from '@material-ui/icons/Print';
import axios from 'axios';
import React from 'react';
import { useReactToPrint } from 'react-to-print';
import BackImage from '../../assets/images/back.png';
import DivToPrint from './Print';

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
        position:'relative',
        backgroundColor:'#fff',
    },

    headerImage:{
        position:'relative',
        top:0,
        left:0, 
        width:'100%'
    },
    HeaderButton:{ position:'absolute',top:0,right:0,textAlign:"center"},
    footerImage:{
        position:'relative',
        bottom:0,
        left:0, 
        width:'100%'
    }
}

const { forwardRef, useRef, useImperativeHandle } = React;
const PDF =  forwardRef((props,ref)=>
{
  const componentRef = React.useRef();

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
let printDiv = null
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});

const selectHeaderFile=(event)=> {
  let file = event.target.files[0]
  alert("sasas")
  let form = new FormData();
  if(!file)
  {
    alert(file)
      return;
  }
  form.append('result',file)
  form.append('PID',props.PID)
  console.log(form);
  axios.post('http://localhost:3000/visit/UpdateResult',form)
  .then(res=>{
    console.log("success")
  }).catch(err=>{
  console.log(err);

    alert(err)
  })
  
}

    return (
        <div className="mg20">


        {/* White Shadow Div Start */}
          <div  style={styles.parentDiv} id="myDiv">
                <Fab 
                    color="primary"
                    aria-label="add"
                    onClick={()=>handlePrint()}
                    >
                        <PrintIcon  />
                </Fab> 
                                {/* Header Image Button Start */}
              <label style={styles.HeaderButton} htmlFor="btn-upload">
                <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/*"
                    onChange={selectHeaderFile} />
                    <Fab color="primary"
                        component="span"
                        aria-label="add"
                        >
                        <UploadIcon  />
                    </Fab> 
                    </label>
                {/* Header Image Button End */}
              {/* Image Div Parent Start */}
            <DivToPrint header={props.header} footer={props.footer} rows={rows} ref={componentRef}/>
            {/* Image Div Parent End */}


          </div>

      </div >
    );
})
export default PDF;