import React,{ useState,useEffect} from "react";
function Option(props){
  var courseObject = {
      "BTech": [
          "Information Technology",
          "Computer Science and Engineering",
          "Mechanical Engineering",
          "Electronics and Communication Engineering",
          "Computer Science and Business System",
          "Data Science",
          "Artificial Intelligence",
          "Machine Learning",
          "Information Technology",
      ],

      "M Tech": [
          " Biotechnology",
          "Computer Science and Engineering",
          "Mechanical Engineering",
          "VLSI Design",
      ],

      "B Tech and M Tech integrated": [
          "Computer Science and Engineering",
      ],

      "B Pharm": [
          "B Pharm (PCI Approved)",
      ],

      "D Pharm": [
          "D Pharm",
      ],

      "M Pharm": [
          "Pharmaceutical Chemistry",
          "Pharmaceutics",
          "Pharmacology",
      ],

      "MBA": [
          "MBA",
      ],

      "MCA": [
          "MCA",
      ],
  };  
  const courses=[];
  const[branches,setbranches]=useState([])
  const  [courseDetail,setCourseDetail]=useState({
    course: "",
    branch:""
  })
  for(const key in courseObject){
    courses.push(key)
  }

  const handleChange=(event)=>{
    const {name,value}=event.target;
    var value1;

    if(name==="course"){
      setbranches(courseObject[value]);
      courseDetail.branch===""?value1="":value1=courseObject[value][0]
    }

    setCourseDetail(prevValue=>{
      var x;
      name !=="course"?x= {...prevValue,[name]:value}: x={[name]:value,"branch":value1}
      return x;
    });

  }
  
  useEffect(()=>{
    if(courseDetail.branch!==""){
      props.optionDetail(courseDetail)
    }
  })
  
  
  return<>
      <div className="course">
        <select 
          id="course" 
          name="course" 
          onChange={handleChange}
          required>
          <option 
            disabled selected="selected">Course
          </option>
          {courses.map((key)=>{
            return <option>{key}</option>
          })}
        </select>
        
        <select 
          id="branch" 
          name="branch"
          onChange={handleChange} 
          required>
          <option 
            value="" 
            disabled selected="selected">Branch
          </option>
          {branches.map(key=>{
            return <option>{key}</option>
          })}
        </select>
      </div>
    </>
}
export default Option;