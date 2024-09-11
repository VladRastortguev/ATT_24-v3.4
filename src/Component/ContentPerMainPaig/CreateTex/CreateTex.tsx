import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import TaskName from '../PodComponent/TaskName'
import UserName from '../PodComponent/UserName'
import UserEmail from '../PodComponent/UserEmail'
import TaskOrganization from '../PodComponent/TaskOrganization'
import TaskInfluence from '../PodComponent/TaskInfluence'
import TaskUrgency from '../PodComponent/TaskUrgency'
import { Context } from '../../..'
import AuthService from '../../../services/AuthService'

import '../CreateTex/CreateTex.css'
import TaskComment from '../PodComponent/TaskComment'
import ModalEmptyForm from '../../AlertModal/ModalEmptyForm/ModalEmptyForm'
import ModalSucces from '../../AlertModal/ModalSuccess/ModalSucces'

const CreateTex:FC = () => {
    const [taskType, setTaskType] = useState('')

    const [taskService, setTaskService] = useState('')

    const [taskName, setTaskName] = useState('')
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [taskOrganization, setTaskOrganization] = useState('')
    const [taskInfluence, setTaskInfluence] = useState('')
    const [taskInfluenceDescr, setTaskInfluenceDescr] = useState('')
    const [taskUrgency, setTaskUrgency] = useState('')
    const [taskUrgencyDescr, setTaskUrgencyDescr] = useState('')
    const [taskComment, setTaskComment] = useState('')
    const [taskPodInfluence, setTaskPodInfluence] = useState('')
    const [fileElement, setFileElement] = useState<File | null>(null)
    const [base64File, setBase64File] = useState('')  

    const [feedback, setFeedback] = useState('')

    const [modalEmpty, setModalEmpty] = useState(false)
    const [modalSuccess, setModalSuccess] = useState(false)

    const { store } = useContext(Context)

    useEffect(() => {
        const fetchData = async () => {
            try {
                store.setLoading(true)
                await store.checkAuth()
            } catch (e) {
                alert(e)
            } finally {
                store.setLoading(false)
            }
        }

        fetchData()
    }, [])
  
    useEffect(() => {
        if (store.isAuth) {
            try {
                setUserName(String(localStorage.getItem('UserName')))
                setUserEmail(String(localStorage.getItem('userEmail')))
                setTaskOrganization(String(localStorage.getItem('company')))
            } catch (e) {
                alert(e)                
            }
        }
    }, [store.isAuth])
    
    const handleSetTaskName = (newState: string) => {
        setTaskName(newState)
    }

    const handleSetUserName = (newState: string) => {
        setUserName(newState)
    }

    const handleSetUserEmail = (newState: string) => {
        setUserEmail(newState)
    }

    const handleSetTaskOrganization = (newState: string) => {
        setTaskOrganization(newState)
    }

    const handleSetTaskInfluence = (newState: string) => {
        setTaskInfluence(newState)
    }

    const handleSetTaskInfluenceDescr = (newState: string) => {
        setTaskInfluenceDescr(newState)
    }

    const handleSetTaskUrgency = (newState: string) => {
        setTaskUrgency(newState)
    }

    const handleSetTaskUrgencyDescr = (newState: string) => {
        setTaskUrgencyDescr(newState)
    }

    const handleSetTaskComment = (newState: string) => {
        setTaskComment(newState)
    }

    const handleChangeButtonModalEmpty = (newState: boolean) => {
        setModalEmpty(newState)
    }

    const handleChangeButtonModalSuccess = (newState: boolean) => {
        setModalSuccess(newState)
    }

    const handleSetTaskPodInfluence = (newState: string) => {
        setTaskPodInfluence(newState)
    }

    const InterfaceObj = {
      changeTaskName: handleSetTaskName,
      changeUserName: handleSetUserName,
      changeUserEmail: handleSetUserEmail,
      changeTaskOrganization: handleSetTaskOrganization,
      changeTaskInfluence: handleSetTaskInfluence,
      changeTaskInfluenceDescr: handleSetTaskInfluenceDescr,
      changeTaskUrgency: handleSetTaskUrgency,
      changeTaskUrgencyDescr: handleSetTaskUrgencyDescr,
      changeTaskComment: handleSetTaskComment,
      changeTaskPodInfluence: handleSetTaskPodInfluence,
      taskName: taskName,
      userName: userName,
      userEmail: userEmail,
      taskOrganization: taskOrganization,
      taskInfluence: taskInfluence,
      taskInfluenceDescr: taskInfluenceDescr,
      taskUrgency: taskUrgency,
      taskUrgencyDescr: taskUrgencyDescr,
      taskComment: taskComment,
      taskPodInfluence: taskPodInfluence
  }

    const InterfaceObjModal = {
        changeButtonEmpty: handleChangeButtonModalEmpty,
        changeButtonSuccess: handleChangeButtonModalSuccess
    }

    const hadnleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {        
            setFileElement(event.target.files[0])       
        }                
    }

    useEffect(() => {                            
        if (fileElement) {                       
            const reader = new FileReader()
            // reader.readAsDataURL(fileElement)
            // reader.onloadend = () => {
            //     const base64Str = reader.result?.toString().split(',')[1]
            // }

            reader.onload = () => {
                setBase64File(reader.result as string)
            }            

            reader.readAsDataURL(fileElement)
        }       
    }, [fileElement])

    async function setNewTask() {
        if (
            !taskService.trim()        ||
            !taskName.trim()           ||
            !taskInfluence.trim()      ||
            !taskInfluenceDescr.trim() ||
            !taskUrgency.trim()        ||
            !taskUrgencyDescr.trim()   ||
            !taskComment.trim()        ||
            !feedback.trim()
        ) {
            setModalEmpty(true)
            return
        }

        let taskObj = [
            {
                ТипЗадачи             : "Задача Тех. Поддержке",
                ПодтипЗадачи          : taskService,
                Наименование          : taskName,
                ИмяПользователя       : userName,
                email                 : userEmail,
                КомпанияЗаказчик      : taskOrganization,
                ВлияниеЗадачи         : taskInfluence,
                ВлияниеЗадачиПодробно : `Влияние задачи подробно: ${taskInfluenceDescr}`,
                Срочность             : taskUrgency,
                СрочностьПодробно     : `Срочность задачи подробно: ${taskUrgencyDescr}`,
                Описание              : taskComment,
                ОбратнаяСвязь         : feedback,
                file                  : base64File,
            }   
        ]    

        store.setLoading(true)

        try {
            const res = AuthService.setNewTask(taskObj, String(localStorage.getItem('userEmail')))            
        } catch (e) {
            alert(e);
        } finally {
            store.setLoading(false)
        }

        setTaskType("")
        setTaskService("")

        handleSetTaskName("")
        // handleSetUserName("")    
        // handleSetUserEmail("") 
        // handleSetTaskOrganization("") 
        handleSetTaskInfluence("") 
        handleSetTaskInfluenceDescr("")
        handleSetTaskUrgency("") 
        handleSetTaskUrgencyDescr("")
        handleSetTaskComment("")
        setFeedback("")

        setModalSuccess(true)
    }

    function resetTaskType(tasktype:string) {
        switch (tasktype){
            case 'Выезды':
                return (
                    <>
                        <option value=""></option>                        
                        <option value="Выезд Алтын Тулпар (Абая 48а)">Выезд Алтын Тулпар</option>
                        <option value="Выезд Бакр (Ошская 35а)">Выезд Бакр</option>
                        <option value="Выезд в Сервис">Выезд в Сервис</option>
                        <option value="Выезд Другое">Выезд Другое</option>
                        <option value="Выезд Завод Тулпар Моторс (с. Белодское, ул. Иподромная 12)">Выезд Завод Тулпар Моторс</option>
                        <option value="Выезд Киа Бишкек (Жукеева-Пудовкина 85\4)">Выезд Киа Бишкек</option>
                        <option value="Выезд Лкв Центр (Садыгалиева 1а)">Выезд Лкв Центр</option>
                        <option value="Выезд Таможенный склад (Чокана Валиханова 2г\1)">Выезд Таможенный склад</option>
                        <option value="Выезд Тойота Центр (Горького 1а стр13)">Выезд Тойота Центр</option>
                        <option value="Выезд Хавал (Касыма Тыныстанова 61а)">Выезд Хавал</option>
                        <option value="Выезд Эстокада (Абдрахманова 327)">Выезд Эстокада</option>                        
                        <option value="Выезд Geely (Медерова 117)">Выезд Geely</option>                        
                    </>
                )
            case 'Доступы':
                return (
                    <>
                        <option value=""></option>                        
                        <option value="Блокировка карты доступа уволенного сотрудника">Блокировка карты доступа уволенного сотрудника</option>
                        <option value="Блокировка почты уволенного сотрудника">Блокировка почты уволенного сотрудника</option>
                        <option value="Настройки прав доступа в общие папки">Настройки прав доступа в общие папки</option>                        
                        <option value="Подготовка электронных карт доступа">Подготовка электронных карт доступа</option>
                        <option value="Создание кода отпечатков пальцев">Создание кода отпечатков пальцев</option>
                    </>
                )
            case 'Коммуникации':
                return (
                    <>
                        <option value=""></option>
                        <option value="Настройка почты на рабочий компьютер">Настройка почты на рабочий компьютер</option>
                        <option value="Настройка почты на телефон">Настройка почты на телефон</option>
                        <option value="Сбой в работе электронной почты">Сбой в работе электронной почты</option>
                        <option value="Создание аккаунтов microsoft zoom и др">Создание аккаунтов microsoft zoom и др</option>
                        <option value="Создание почты">Создание почты</option>
                    </>
                )
            case 'Монтажные работы':
                return (
                    <>
                        <option value=""></option>
                        <option value="Монтаж кабеля интернета для рабочего места">Монтаж кабеля интернета для рабочего места</option>
                        <option value="Монтаж камер видеонаблюдения">Монтаж камер видеонаблюдения</option>
                        <option value="Монтаж системы контроля доступа">Монтаж системы контроля доступа</option>
                        <option value="Монтаж системы контроля учета рабочего времени">Монтаж системы контроля учета рабочего времени</option>
                        <option value="Монтаж точки WiFi">Монтаж точки WiFi</option>
                        <option value="Перенос компьютерного оборудования">Перенос компьютерного оборудования</option>
                    </>
                )
            case 'Настройка и обслуживание':
                return (
                    <>
                        <option value=""></option>
                        <option value="Настройка МФУ">Настройка МФУ</option>
                        <option value="Настройка оргтехники">Настройка оргтехники</option>
                        <option value="Настройка принтера">Настройка принтера</option>
                        <option value="Настройка сканера">Настройка сканера</option>
                        <option value="Подготовка АРМ нового сотрудника">Подготовка рабочего места для нового сотрудника</option>
                        <option value="Подключение переферийных устройств">Подключение переферийных устройств</option>
                        <option value="Профилактика компьютера">Профилактика компьютера</option>
                        <option value="Профилактика оргтехники">Профилактика оргтехники</option>
                        <option value="Сбой в работе wifi">Сбой в работе wifi</option>
                        <option value="Сбой в работе оргтехники">Сбой в работе оргтехники</option>
                        <option value="Заправка картриджей">Заправка картриджей</option>
                        <option value="Закупка оргтехники">Закупка оргтехники</option>
                        <option value="Ремонт оргтехники">Ремонт оргтехники</option>
                    </>
                )
            case 'Настройка ПО':
                return (
                    <>
                        <option value=""></option>
                        <option value="Активация операционной системы">Активация операционной системы</option>
                        <option value="Активация/установка офисного пакета MS Office">Активация/установка офисного пакета MS Office</option>
                        <option value="Настройка камер на личный телефон">Настройка камер на личный телефон</option>
                        <option value="Настройка камер на рабочий компьютер">Настройка камер на рабочий компьютер</option>
                        <option value="Настройка удаленного доступа (VPN)">Настройка удаленного доступа (VPN)</option>
                        <option value="Установка операционной системы">Установка операционной системы</option>
                        <option value="Установка программного обеспечения">Установка программного обеспечения</option>
                    </>
                )
          default:
              return (
                  <>
                      <option value=""></option>
                  </>
              )
      }
          
    }

    function checkInfluence(taskInfluence: string) {
        switch (taskInfluence) {
            case 'Критический':
                return (
                    <>
                        <option value=""></option>
                        <option value="Полная потеря функциональности продукта">Полная потеря функциональности продукта</option>
                        <option value="Проблема затрагивает большое количество пользователей">Проблема затрагивает большое количество пользователей</option>
                        <option value=" ">Проблема не влияет на работу большого количества пользователей</option>
                    </>
                )
            case 'Высокий':
                return (
                    <>
                        <option value=""></option>
                        <option value="Значительное снижение функциональности">Значительное снижение функциональности</option>
                        <option value="Проблема затрагивает ограниченное количество пользователей">Проблема затрагивает ограниченное количество пользователей</option>
                        <option value="Проблема не влияет на работу большого количества пользователей">Проблема не влияет на работу большого количества пользователей</option>
                    </>
                )
            case 'Средний':
                return (
                    <>
                        <option value=""></option>
                        <option value="Частичное снижение функциональности">Частичное снижение функциональности</option>
                        <option value="Проблема имеет временное решение">Проблема имеет временное решение</option>
                        <option value="Проблема не имеет временного решения">Проблема не имеет временного решения</option>                        
                    </>
                )
            case 'Низкий':
                return (
                    <>
                        <option value=""></option>
                        <option value="Незначительные проблемы">Незначительные проблемы</option>
                        <option value="Нет непосредственной угрозы функциональности">Нет непосредственной угрозы функциональности</option>
                    </>
                )
            default:
                return (
                    <>
                        <option value=""></option>
                    </>
                )
        }
    }

    if (store.isLoading) {
        return (
            <Container>
                ...Загрузка
            </Container>
        )
    }

    return (
        <>
            <Container className='VR_Container_Header'>
                <Container className='VR_Container_Title'>
                    <h1>Задача Тех. Поддержке</h1>
                </Container>  

                <Form.Group className="mb-3" controlId="ControlSelect1">
                    <div className='VR_taskType_FlexLine'>
                        <div className='VR_taskType_type'>
                            <Form.Label>Выберите тип задачи:</Form.Label>
                            <Form.Select 
                                className='VR_TaskName' 
                                aria-label="Тип задачи:"
                                value={taskType}
                                onChange={(e) => setTaskType(e.target.value)}>
                                
                                <option></option>
                                <option value="Выезды">Выезды</option>
                                <option value="Доступы">Доступы</option>
                                <option value="Коммуникации">Коммуникации</option>
                                <option value="Монтажные работы">Монтажные работы</option>
                                <option value="Настройка и обслуживание">Настройка и обслуживание</option>
                                <option value="Настройка ПО">Настройка ПО</option>
                            </Form.Select>
                        </div>

                        <div className='VR_taskType_service'>
                            <Form.Label>Выберите задачу:</Form.Label>
                            <Form.Select
                                aria-label='Ваша задача:'
                                value={taskService}
                                onChange={(e) => setTaskService(e.target.value)}>

                                {resetTaskType(taskType)} 
                            </Form.Select>
                        </div>
                    </div>
                </Form.Group>  

                <Form>
                        <TaskName InterfaceObj={InterfaceObj} />
                        
                        {store.isAuth ? (
                            null
                        ) : (
                            <>
                                <UserName InterfaceObj={InterfaceObj} />
                                <UserEmail InterfaceObj={InterfaceObj} /> 
                                <TaskOrganization InterfaceObj={InterfaceObj} />
                            </>
                        )}

                        <div className='VR_taskType_FlexLine'>

                            <div className='VR_taskType_type'>
                                <Form.Group className="mb-3" controlId="ControlSelect2">
                                    <Form.Label>Приоритет Вашей задачи:</Form.Label>                
                                    <Form.Select
                                        className='VR_TaskName' 
                                        aria-label="Влияние вашей задачи:"
                                        value={taskInfluence}
                                        onChange={(e) => handleSetTaskInfluence(e.target.value)}>
            
                                        <option></option>
                                        <option value='Низкий'>Низкий</option>
                                        <option value='Средний'>Средний</option>
                                        <option value='Высокий'>Высокий</option>
                                        <option value='Критический'>Критический</option>
                                    </Form.Select>            
                                </Form.Group> 
                            </div>

                            <div className='VR_taskType_service'>
                                <Form.Group>
                                    <Form.Label>Пояснение приоритета:</Form.Label>
                                    <Form.Select
                                        // className='VR_TaskName'
                                        aria-label='Пояснение приоритета:'
                                        value={taskPodInfluence}
                                        onChange={(e) => setTaskPodInfluence(e.target.value)}>

                                        {checkInfluence(taskInfluence)}

                                    </Form.Select>
                                </Form.Group>  
                            </div>

                        </div>

                        <Form.Group className="mb-3" controlId="ControlTextarea1">
                            <Form.Label>Опишите влияние вашей задачи:</Form.Label>
                            <Form.Control 
                                className='VR_TaskName' 
                                as="textarea" 
                                rows={3}
                                value={taskInfluenceDescr} 
                                onChange={(e) => handleSetTaskInfluenceDescr(e.target.value)}/>
                        </Form.Group>

                        {/* <TaskInfluence InterfaceObj={InterfaceObj} />    */}
                        <TaskUrgency InterfaceObj={InterfaceObj} />

                        <Form.Group className='mb-3' controlId='ControlTextarea1'>
                            <Form.Label>Укажите Ваш номер телефона или другой способ связи с Вами</Form.Label>
                            <Form.Control 
                                className='VR_Feedback'
                                as="input"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}/>
                        </Form.Group>

                        <TaskComment InterfaceObj={InterfaceObj}/>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Добавьте скриншот ошибки:</Form.Label>
                            <Form.Control 
                                type="file"                        
                                onChange={hadnleFileChange}
                                accept='image/*, .png'                        
                            />
                        </Form.Group>
                    
                        {modalEmpty ? (
                            <div className='ModalEmpty_HeaderBlock'>
                                <ModalEmptyForm InterfaceObj={InterfaceObjModal} />
                            </div>
                        ) : (
                            <></>
                        )}

                        {modalSuccess ? (
                            <div className='ModalSuccess_headerBlock'>
                                <ModalSucces InterfaceObj={InterfaceObjModal} />
                            </div>
                        ) : (
                            <></>
                        )}

                    <div className='VR_FlexBtnCreate'>
                        <Button onClick={() => {
                            setNewTask()               
                        }} className='mb-5 mt-3 ps-5 pe-5' variant="outline-dark">Создать</Button>      
                    </div>
                </Form>
            </Container>
        </>
    )
}

export default observer(CreateTex)
