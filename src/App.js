import React, { useReducer, useRef } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';

const reducer = (state, action) => {
  let newState = [];
  switch(action.type){
    case 'INIT':{
      return action.data;
    }
    case 'CREATE':{
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE':{
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT':{
      newState = state.map((it)=>it.id === action.data.id ? {...action.data} : it);
      break;
    }
    default:
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id:1,
    emotion:1,
    content:"1번 일기",
    date : 1650093219647,
  },
  {
    id:2,
    emotion:5,
    content:"2번 일기",
    date : 1650093219648,
  },
  {
    id:3,
    emotion:3,
    content:"3번 일기",
    date : 1650093219649,
  },
  {
    id:4,
    emotion:2,
    content:"4번 일기",
    date : 1650093219650,
  },
  {
    id:5,
    emotion:4,
    content:"5번 일기",
    date : 1650093219651,
  },
  {
    id:6,
    emotion:3,
    content:"6번 일기",
    date : 1651244400001,
  }
]


const App = () => {

  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);

  const onCreate = (date, content, emotion)=>{
    dispatch({type : "CREATE", data:{
      id : dataId.current,
      date : new Date(date).getTime(),
      content,
      emotion,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({type : "REMOVE", targetId});
  }

  const onEdit = (targetId, date, content, emotion) =>{
    dispatch({type : "EDIT", data:{
      id: targetId,
      date : new Date(date).getTime(),
      content,
      emotion,
      },
    })
  }



  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
