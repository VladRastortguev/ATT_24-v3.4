import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';

import '../MyTaskContent/MyTaskContent.css'
import { Button, Container } from 'react-bootstrap';
import { OneTaskInterface } from '../../models/itil/itilOneTaskInterface';
import { Context } from '../..';
import { useLocation } from 'react-router-dom';
import UserService from '../../services/UserService';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import PauseIcon from '@mui/icons-material/Pause';
import CachedIcon from '@mui/icons-material/Cached';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { MyTaskContentInterface } from './MyTaskContentInterface';

const MyTaskContent:FC<MyTaskContentInterface> = ({FunctionObj}) => {
    const [allTask, setAllTask] = useState<OneTaskInterface[]>([])
    // const [tas]
    
    const { store } = useContext(Context)
    
    const location = useLocation()
    const body = document.body;

    if (String(location.pathname) == '/' && !store.isAuth) {
        body.style.overflow = 'hidden'
    }

    useEffect(() => {
        getMyTasksAll()
    }, [])

    async function getMyTasksAll() {
        store.setLoading(true)

        try {
            const res = await UserService.getAllTask(String(localStorage.getItem('userEmail')))
            
            setAllTask(res.data)
        } catch(e) {
            console.log(e);            
        } finally {
            store.setLoading(false)
        }
    }

    function TasksStatus(CurrentStage: string) {
        switch (CurrentStage) {
            case '':
                return (
                    <>
                        <DoneAllIcon color='success'/>
                    </>
                )
            case 'В очереди':
                return (
                    <>
                        <PauseIcon className='VR_PauseIcon_TaskList' />
                    </>
                )
            case 'В работе':
                return (
                    <>
                        <CachedIcon color='info' />
                    </>
                )
            case 'Согласование':
                return (
                    <>
                        <AssignmentIndIcon color='inherit' />
                    </>
                )
        }
    }
    
    function TasksDateSplit(date: string) {
        switch (date) {
            case '01.01.0001':
                return (
                    <>
                        В процессе
                    </>
                )
            default:
                return (
                    <>
                        {date}
                    </>
                )
        }
    }

    console.log(allTask);
    

    if (store.isLoading) {
        return (
            <Container>
                Загрузка...
            </Container>
        )
    }

    return (
        <>
            <Container>
                <div className='VR_AllHeaderTaskList_MyTasks'>
                    <ul className='VR_TaskListHeader_MyTasks'>
                        <li className='VR_TaskStatusHeader_MyTasks'>Статус</li>
                        <li className='VR_TaskNumberHeader_MyTasks'>Номер</li>
                        <li className='VR_TaskDateCompletionHeader_MyTasks'>Дата завершения</li>
                        <li className='VR_TaskExecutorHeader_MyTasks'>Исполнитель</li>
                        <li className='VR_TaskInitiatorHeader_MyTasks'>Инициатор</li>
                        <li className='VR_TaskOrganizationClientHeader_MyTasks'>Организация</li>
                        <li className='VR_TaskPriorityHeader_MyTasks'>Приоритет</li>
                        <li className='VR_TaskName_MyTaksks'>Наименование</li>
                    </ul>
                    {allTask.map((item, index) => (
                        <ul className={`VR_TaskList_MyTasks ${
                            item.CurrentStage == '' ? 'VR_TaskListSuccess_MyTasks' : (
                                item.CurrentStage == 'В очереди' ? 'VR_TaskListPause_MyTasks' : (
                                    item.CurrentStage == 'В работе' ? 'VR_TaskListOnProcess' : (
                                        item.CurrentStage == 'Согласование' ? 'VR_TaskListSogl_MyTasks' : null
                                    )
                                )
                            )
                        }`} key={index}>
                            <li className='VR_TaskStatus_MyTasks' key={`status-${index}`}>{TasksStatus(String(item.CurrentStage))}</li>
                                
                            <li className='VR_TaskNumber_MyTasks' key={`number-${index}`}>{`${String(item.Number).slice(0, 2)}
                                                                    ${String(item.Number).slice(4, 5)}
                                                                    ${String(item.Number).slice(20, 25)}`}</li>
                            
                            <li className='VR_TaskDate_MyTasks' key={`date-${index}`}>
                                {TasksDateSplit(String(item.DateOfCompletion).split(' ')[0])}                        
                            </li>                    

                            <li className='VR_TaskExecutor_MyTasks' key={`executor-${index}`}>
                                {`
                                    ${String(item.Executor).split(' ')[0]} 
                                    ${String(String(item.Executor).split(' ')[1]).substring(0, 1)}.
                                    ${String(String(item.Executor).split(' ')[2]).substring(0, 1)}.
                                `}
                            </li>

                            <li className='VR_TaskInitiator_MyTasks' key={`initiator-${index}`}>{`
                                ${String(item.Initiator).split(' ')[0]} 
                                ${String(String(item.Initiator).split(' ')[1]).substring(0, 1)}.
                                ${String(String(item.Initiator).split(' ')[1]).substring(0, 1)}.
                            `}</li>


                            <li className='VR_TaskOrganizationClient_MyTasks' key={`organization-${index}`}>{item.OrganizationClient}</li>
                            
                            <li className='VR_TasksPryority_MyTasks' key={`priority-${index}`}>{item.Priority}</li>                            

                            <li className='VR_targetTaskName_MyTasks' key={`taskname-${index}`}>{`${String(item.TaskName).slice(0, 20)}...`}</li>


                        </ul>
                    ))} 
                </div>
            </Container>

            {FunctionObj.showSettingBlock ? (
                <div className='VR_SettingsForm_MyTasks'>
                    <div className='VR_AllHeaderSettings_MyTasks'> 
                        <div className='VR_TitleSettings_MyTasks'>
                            <h4>Форма настроек отображения задач</h4>
                        </div>                   
                        
                        <div className='VR_MainSettings_MyTasks'>

                        </div>

                        <div className='VR_CloseSettingsForm_MyTasks'>
                            <Button variant='outline-dark' onClick={() => FunctionObj.changeShowBlock?.(false)}>Закрыть</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )} 

            {/* <div className='VR_MyTaskHeaderDiv'>
                <h1>Добрый день! <br />
                    К сожалению данный блок, <br />
                    сейчас находиться в разработке.</h1>
            </div> */}
        </>
    );
};

export default observer(MyTaskContent);