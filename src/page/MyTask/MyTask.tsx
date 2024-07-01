import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';
import Loginpage from '../Loginpage/Loginpage';
import Header from '../../Component/Header/Header';
import MyTaskContent from '../../Component/MyTaskContent/MyTaskContent';

const MyTask:FC = () => {
    const [showSettingBlock, setShowSettingBlock] = useState(false)
    
    const { store } = useContext(Context)
    const navigate = useNavigate()
        
    const handleChangeShowSettingBlock = (newState: boolean) => {
        setShowSettingBlock(newState)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await store.checkAuth()
            } catch(e) {
                console.log(e);                
            }
        }

        fetchData()
    }, [])

    const InterfaceObj = {
        pageName: 'MyTask'
    }

    const FunctionObj = {
        changeShowBlock: handleChangeShowSettingBlock,
        showSettingBlock: showSettingBlock
    }

    if (!store.isAuth) {
        return (
            <Loginpage />
        )
    }

    return (
        <>
            <Header InterfaceObj={InterfaceObj} FunctionObj={FunctionObj} />
            <MyTaskContent FunctionObj={FunctionObj}/>
        </>
    );
};

export default observer(MyTask);