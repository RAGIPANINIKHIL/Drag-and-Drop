import React, { useState, useEffect } from 'react';
import './tabledraggable.css';
import  ExcelTable  from '../utils/table';


export default function AppDragDropDemo (props) {
    const {coloumnNames, Items} = props;
    const [coloumns, setColoumns] = useState([]);

    var tasks = {
        wip: [],
        complete: []
    }

    useEffect(() => {
        setcoloumn();
    }, [])
    

    const onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    const onDragOver = (ev) => {
        ev.preventDefault();
    }

    const setcoloumn = ()=> {
        let coloumns = coloumnNames.filter((task) => {
            if (task.category == 'complete') {
                return task;
            }
        });    
           setColoumns(coloumns);   
    }

        
       const  onDrop = (ev, cat,) => {
        let id = ev.dataTransfer.getData("id");
        
        let tasks = coloumnNames.filter((task) => {
            if (task.name == id) {
                task.category = cat;
            }
            return task;
        }); 
       setcoloumn();
     }

    const clickrefresh = () => {
        coloumnNames.forEach((t) => {
                 t.category = 'wip'
        });    
           setColoumns([]);   
    }


    coloumnNames.forEach((t, i) => {
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
                    className="wipdraggablecomplete"
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
                <h2 className="header">TABULAR VIEW</h2>
                <div className="wipclass"
                    onDragOver={(e)=>onDragOver(e)}
                    onDrop={(e)=>{onDrop(e, "wip")}}> 
                    <span className="task-header">Header Names</span>
                    {tasks.wip}
                </div>
                <div className="droppableclass" 
                    onDragOver={(e)=>onDragOver(e)}
                    onDrop={(e)=>onDrop(e, "complete")}>
                     <span className="task-header">COMPLETED</span>
                     {coloumnNames.length > 0 && <button onClick={()=>clickrefresh()}> REFRESH </button>}
                     { coloumns.length > 0 &&
                     <ExcelTable  coloumn={coloumns} data={Items}/> }
                </div>


            </div>
        );
    }
