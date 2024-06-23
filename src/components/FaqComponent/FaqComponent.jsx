import React, { useState } from 'react'
import cl from './FaqComponent.module.css'
import unfold from '../../assets/images/unfold.svg'
import fold from '../../assets/images/fold.svg'

function FaqComponent({title, description}) {
    const [isActive, setIsActive] = useState(false);

    const handleChangeActive = () => {
        setIsActive(prevState => !prevState);
    }

  return (
    <div className={cl.faqComponent}>
        <div className={cl.faqComponent__content}>
            <div className={cl.content_header}>
                <div className={cl.header_title}>{title}</div>
                <div className={cl.faqComponent__btn}>
                    {
                        isActive
                        ?
                            <div className={cl.faq_btn} onClick={handleChangeActive}>
                                <img src={fold} alt="fold" />
                            </div>
                        :
                            <div className={cl.faq_btn} onClick={handleChangeActive}>
                                <img src={unfold} alt="unfold"/>
                            </div>
                    }
                </div> 
            </div>
            
            {
                isActive && 
                <div className={cl.content_description}>
                    {description.split('\n').map((item, key) => (
                        <span key={key}>
                        {item}
                        <br />
                        </span>
                    ))}
                </div>
            }
        </div>  
    </div>
  )
}

export default FaqComponent