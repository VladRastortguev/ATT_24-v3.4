import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';

import '../AccessAA6Form/AccessAA6Form.css'
import Header from '../../Component/Header/Header';

const AccessAA6Form:FC = () => {

    const dataTable:any = []

    const colTable = [
        <span>Справочник \ Должность</span>,
        <span>Аналитик отдела <br /> продаж автомобилей</span>,
        <span>Аналитик отдела <br /> продаж автомобилей <br /> с пробегом</span>,
        <span>Ключевой специалист <br /> отдела продаж <br /> автомобилей с <br /> пробегом</span>,
        <span>Ключевой специалист <br /> отдела продаж <br /> новых автомобилей</span>
    ]

    const rowTable = [
        <span>Автомобили</span>,
        <span>Присоединенные файлы <br /> (Автомобили)</span>,
        <span>Автоработы</span>,
        <span>Присоединенные файлы <br /> (Автоработы)</span>,
        <span>Присоединенные файлы <br /> (Акт оценки автомобиля)</span>,
        
        <span>Алгоритмы расчета цен</span>,
        <span>Банковские счета</span>,
        <span>Бонусные программы</span>,
        <span>Варианты комплектации</span>,
        <span>Присоединенные файлы <br /> (Варианты комплектации)</span>,
    
        <span>Виды аренды</span>,
        <span>Виды взаимоотношений</span>,
        <span>Виды интервалов</span>,
        <span>Виды планов компании</span>,
        <span>Виды ремонта</span>,

        <span>Виды событий</span>,
        <span>Состояния заказ-нарядов</span>,
        <span>Виды состояний <br /> пакетов работ</span>,
        <span>Возражения и причины <br /> отказов</span>,
        <span>Возрастные группы</span>,

        <span>Графики работы</span>,
        <span>ГТД</span>,
        <span>Дефекты</span>,
        <span>Договоры взаиморасчетов</span>,
        <span>Присоединенные файлы <br /> (Договоры взаиморасчетов)</span>,

        <span>Должности</span>,
        <span>Единицы измерения</span>,
        <span>Присоединенные файлы <br /> (Жалоба клиента)</span>,
        <span>Присоединенные файлы <br /> (Заказ на автомобиль)</span>,
        <span>Присоединенные файлы <br /> (Заказ-наряд)</span>,

        <span>Присоединенные файлы <br /> (Заказ покупателя)</span>,
        <span>Присоединенные файлы <br /> (Заявка на аренду)</span>,
        <span>Присоединенные файлы <br /> (Заявка на ремонт)</span>,
        <span>Источники запроса</span>,
        <span>Источники информации</span>,

        <span>Карточки</span>,
        <span>Кассы ККМ</span>,
        <span>Кассы компании</span>,
        <span>Категории жалоб клиентов</span>,
        <span>Категории транспортных средств</span>,

        <span>Категории качества</span>,
        <span>Классификатор единиц измерения</span>,
        <span>Классификатор ОКПД2</span>,
        <span>Классификатор ТН ВЭД</span>,
        <span>Коды операций прослеживаемости</span>,

        <span>Контрагенты и контакты</span>,
        <span>Присоединенные файлы <br /> (Контрагенты)</span>,
        <span>Присоединенные файлы <br /> (Корректировка поступления)</span>,
        <span>Присоединенные файлы <br /> (Корректировка реализации)</span>,
        <span>Кредитные программы</span>,

        <span>Маркетинговые программы</span>,
        <span>Марки</span>,
        <span>Маршруты тест-драйвов</span>,
        <span>Присоединенные файлы <br /> (Маршруты тест-драйвов)</span>, 
        <span>Мессенджеры</span>,

        <span>Модели автомобилей</span>,
        <span>Модели двигателей</span>,
        <span>Присоединенный файлы <br /> (Модели автомобилей)</span>,
        <span>Наборы дополнительных <br /> реквизитов и сведений</span>,
        <span>Настройка печати комплекта</span>,

        <span>Настройки <br /> выгрузки/загрузки данных</span>,
        <span>Настройки транспорта <br /> исходящих файлов</span>,
        <span>Номенклатура</span>,
        <span>Номенклатура контрагентов</span>,
        <span>Присоединенные файлы <br /> (Номенклатура)</span>,

        <span>Нормочасы</span>,
        <span>Опции автомобилей</span>,
        <span>Присоединенные файлы <br /> (Опции автомобилей)</span>,
        <span>Патенты</span>,
        <span>Подписанты</span>,

        <span>Присоединенные файлы <br /> (Подразделения компании)</span>,
        <span>Подтверждающие документы</span>,
        <span>Присоединенные файлы <br /> (Подтверждающие документы)</span>,
        <span>Прайс-листы контрагентов</span>,
        <span>Предметы обращения</span>,

        <span>Причины обращений</span>,
        <span>Причины отказа <br /> от обслуживания</span>,
        <span>Программы страхования</span>,
        <span>Производители</span>,
        <span>Прочие активы</span>,

        <span>Присоединенные файлы <br /> (Рабочий лист)</span>,
        <span>Присоединенные файлы <br /> (Рассылка)</span>,
        <span>Результаты контактов</span>,
        <span>Сервисные кампании</span>,
        <span>Скидки и  <br /> маркетинговые программы</span>,
        
        <span>Склады компании</span>,
        <span>Скрипты разговоров</span>,
        <span>Смены</span>,
        <span>Присоединенные файлы <br /> (Событие)</span>,
        <span>Состояния заявок <br /> на автомобиль</span>,

        <span>Сотрудники</span>,
        <span>Присоединенные файлы <br /> (Сотрудники)</span>,
        <span>(Не используется) <br /> Социальные сети</span>,
        <span>Ставки НДС</span>,
        <span>Статусы автомобилей</span>,

        <span>Статусы рабочего листа</span>,
        <span>Статусы рабочего <br /> листа выкупа</span>,
        <span>Статусы событий</span>,
        <span>Статьи ДДС</span>,
        <span>Статьи доходов и расходов</span>,

        <span>Присоединенные файлы <br /> (Страховой полис)</span>,
        <span>Сценарии планирования</span>,
        <span>Присоединенные файлы <br /> (Счет на оплату)</span>,
        <span>Типы автомобилей</span>,
        <span>Типы двигателей</span>,

        <span>Типы заказов</span>,
        <span>Типы КПП</span>,
        <span>Типы кузовов</span>,
        <span>Типы маркировки</span>,
        <span>Типы номенклатуры</span>,

        <span>Типы обслуживания</span>,
        <span>Типы платежных карт</span>,
        <span>Типы повреждений</span>,
        <span>Типы причин обращения</span>,
        <span>Типы салона</span>,

        <span>Присоединенные файлы <br /> (Типы салона)</span>,
        <span>Типы скидок и наценок</span>,
        <span>Типы цен</span>,
        <span>Типы эксплуатации</span>,
        <span>(Не используется) <br /> Номенклатура поставщиков</span>,
    
        <span>Филиалы компании</span>,
        <span>Характеристики номенклатуры</span>,
        <span>Хранилище шаблонов</span>,
        <span>Цвета</span>,
        <span>Присоединенные файлы <br /> (Цвета)</span>,

        <span>Ценные бумаги</span>,
        <span>Ценовые группы</span>,
        <span>Цеха</span>,
        <span>Ячейки хранения</span>,
    ]

    function cutNameToNormal(name: object | string) {
        let normalStr = '';
        
        if (String(typeof(name)) == 'object') {
            let dynamicObj:any = name
            
            for (let i in dynamicObj) {
                if (String(typeof(dynamicObj[i])) == 'string') {
                    normalStr = `${normalStr} ${dynamicObj[i].trim()}`
                }
            }            
        } else if (String(typeof(name)) == 'string') {
            normalStr = String(name);
        }

        normalStr = normalStr.trim()

        return normalStr
    }


    function createAndSaveTable() {
        const data:any = []

        rowTable.map((item, index) => {
            let thElement = document.querySelector(`tr[data-key="${index}"]`)

            colTable.map((item2, index2) => {
                if (index2 !== 0) {
                    
                    let accessStatus = colTable[index2].props.children            
                    let statusStr = cutNameToNormal(accessStatus)
                    
                    let tableStr = cutNameToNormal(item.props.children)
                    
                    let view = thElement?.querySelector('.VR_ViewCheck_AccessAA6')?.querySelector('input')?.checked
                    let viewStr = view ? 'Есть права' : 'Нет прав';
        
                    let put = thElement?.querySelector('.VR_PutCheck_AccessAA6')?.querySelector('input')?.checked
                    let putStr = put ? 'Есть права' : 'Нет прав';
        
                    let create = thElement?.querySelector('.VR_CreateCheck_AccessAA6')?.querySelector('input')?.checked
                    let createStr = create ? 'Есть права' : 'Нет прав';
        
                    data.push({Должность: statusStr, Справочник: tableStr, Просмотр: viewStr, Редактирование: putStr, Создание: createStr})
                }
            })
        
        }) 

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'})

        const blob = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})

        saveAs(blob, 'data.xlsx')
    }

    const InterfaceObj = {
        pageName: 'AccessAA6'
    }

    return (
        <>
            <Header InterfaceObj={InterfaceObj} />

            <div className='VR_AccessTable_AccessAA6'>

                <table>
                    <tr className='VR_VerticalText_AccessAA6'>
                        {colTable.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                
                    {rowTable.map((item, index) => (
                        <tr data-key={index}>
                            <th key={index}>{item}</th>   


                            {colTable.map((item2, index2) => {
                                if (index2 > 0 && index2 < colTable.length) {
                                    return(
                                        <td>
                                            <div className='VR_CheckBox_AccessAA6'>                            
                                                <div className='VR_ViewCheck_AccessAA6'>
                                                    <p>Просмотр: </p>
                                                    <input key={index} type="checkbox" onChange={(e) => {
                                                        // setChangeToArray(index, index2, e.target.checked, 'Просмотр')                                                                                                                                                                        
                                                    }} />
                                                </div>
            
                                                <div className='VR_PutCheck_AccessAA6'>
                                                    <p>Изменение: </p>
                                                    <input type="checkbox" />
                                                </div>
                                    
                                                <div className='VR_CreateCheck_AccessAA6'>
                                                    <p>Создание: </p>
                                                    <input type="checkbox" />
                                                </div>
                                            </div>
                                        </td>
                                    )                              
                                } 
                            })}
                        </tr>
                    ))}

                </table>

                <button onClick={() => createAndSaveTable()}>Сохранить</button>                 
            </div>
        </>
    )

};

export default observer(AccessAA6Form);