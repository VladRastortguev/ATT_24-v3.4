import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Accordion, Container } from 'react-bootstrap'


import './DataloreContent.css'
import UserService from '../../services/UserService'
import { itilDatalore } from '../../models/itil/itilDataloreModels'
import { Context } from '../..'

const DataloreContent:FC = () => {
    const [dataloreArr, setDataloreArr] = useState<itilDatalore []>([])

    const { store } = useContext(Context)


    useEffect(() => {
        const fetchData = async () => {
            const res = await UserService.getDataloreItil()

            console.log(res.data[0].lorePng);
            

            setDataloreArr(res.data)
        }
        
        fetchData()
        
    }, [])

    // const handleDownload = async (pdffile: string) => {
    //     const 
    // }


    if (store.isLoading) {
        return (
            <Container>
                Загрузка...
            </Container>
        )
    }

    return (
        <Container>
            <div className='VR_Accordion_Content_Header mt-5'>
                <Accordion defaultActiveKey='0'>
                    <Accordion.Item eventKey='0'>
                        <Accordion.Header>Альфа-6</Accordion.Header>
                        <Accordion.Body>

                            <Accordion defaultActiveKey='1'>
                                {dataloreArr.map((item, index) => (
                                    item.lorePR == 'АА6' ? (
                                        <Accordion.Item eventKey={String(index)}>
                                            <Accordion.Header className='VR_Datalore_Header VR_Accordion_Item'>{item.loreName}</Accordion.Header>
                                            <Accordion.Body className='VR_Datalore_ButtonGroup'>
                                                {item.loreDescr != '' ? (
                                                    <div>
                                                        <p className='mb-3 ms-2'>{item.loreDescr}</p>                                                    
                                                        
                                                        <div>
                                                            {/* <a className='ms-2' target='_top' href={`data:application/pdf;base64,${item.lorePng}`}>Просмотреть</a> */}
                                                            <a className='ms-3' download='file.pdf' href={`data:application/pdf;base64,${item.lorePng}`}>Скачать</a>
                                                        </div>
                                                    </div>                                                    
                                                ) : (
                                                    <>
                                                        {/* <a className='ms-2' target='_blank' href={`Datalorepdf/${item.lorePng}`}>Просмотреть</a> */}
                                                        <a className='ms-3' download href={`data:application/pdf;base64,${item.lorePng}`}>Скачать</a>                                                        
                                                    </>
                                                )}                                            
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ) : (
                                        <>
                            
                                        </>
                                    )
                                ))}                                                                                
                            </Accordion>
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>
            </div>
        </Container>
    )
}

export default observer(DataloreContent)