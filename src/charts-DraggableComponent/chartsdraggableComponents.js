import React, { useState, useEffect } from 'react';
import './chartsdraggable.css';
import BarData from '../utils/charts/bar';
import LineData from '../utils/charts/line';
import PieData from '../utils/charts/pie';



export default function ChartsAppDragDropDemo (props) {
    const {excelitems, content} = props;
    const [coloumns, setColoumns] = useState([]);
    const [attributes, setattributes] = useState([]);
    var coloumn;

    var tasks = {
        wip: [],
        complete: []
    }

    useEffect(() => {
        clickrefresh();
    }, [])
    

    const onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    const onDragOver = (ev) => {
        ev.preventDefault();
    }

    const setcoloumn = ()=> {
         coloumn = excelitems.filter((task) => {
            if (task.category == 'complete') {
                return task;
            }
        });    
           setColoumns(coloumn);   
    }
        
     const  onDrop = (ev, cat,) => {
         let id = ev.dataTransfer.getData("id");
         debugger;
        
        let tasks = excelitems.filter((task) => {
            if (task.name == id) {
                //chechking anf mapping coplete category
                task.category = cat;
            }
            return task;
        });

        let attribute = excelitems.find((task) => {
            if(task.name == id && task.category == 'complete'){
                return task;
            }
        })

        attributes.length < 2 && attributes.push(attribute);
        

        setattributes(attributes)
        console.log(attributes)
        setcoloumn();
     }

     const clickrefresh = () => {
        excelitems.forEach((t) => {
                 t.category = 'wip'
        });    
           setColoumns([]);   
           setattributes([]);
    }
       
     excelitems.forEach((t, i) => {
        if (t.category == 'complete') {
            tasks['complete'].push(
                <div key={i}
                    onDragStart={(e) => onDragStart(e, t.name)}
                    draggable
                >
                </div>
            );
            tasks['wip'].push(
                <div key={i}
                    onDragStart={(e) => onDragStart(e, t.name)}
                    draggable
                    className={(coloumns.length < 2 ? 'wipdraggablecomplete' : 'wipdraggable')}
                >
                    {t.name}
                </div>
            );
        } else {
            tasks['wip'].push(
                <div key={i}
                    onDragStart={(e) => onDragStart(e, t.name)}
                    draggable
                    className="wipdraggable"
                >
                    {t.name}
                </div>
            );

        }
    });

        return (
            <div className="container-drag">
                <h2 className="header">{`${content} VIEW`}</h2>
                <div className="wip"
                    onDragOver={(e)=>onDragOver(e)}
                    onDrop={(e)=>{onDrop(e, "wip")}}>
                    <span className="task-header">Header Names</span>
                    {tasks.wip}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>onDragOver(e)}
                    onDrop={(e)=>onDrop(e, "complete")}>
                     <span className="task-header">COMPLETED</span>
                     {tasks.complete}
                     {excelitems.length > 0 && <button onClick={()=>clickrefresh()}> REFRESH </button>}
                     {content === 'BAR' && 
                     coloumns.length > 1 && <BarData coloumn={attributes[0]} rows={attributes[1]}/> }
                      {content === 'LINE' && 
                     coloumns.length > 1 && <LineData coloumn={attributes[0]} rows={attributes[1]}/> }
                     {content === 'PIE' && 
                     coloumns.length > 1 && <PieData coloumn={attributes[0]} rows={attributes[1]}/> }
                </div>


            </div>
        );
    }
