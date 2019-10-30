import React from 'react'
import LazyLoad from 'react-lazy-load';

import './recomendList.scss'

class RecomendList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { list } = this.props
        return (
            <div id="recomendList">
                <div className="list">
                    {list.map(item => {
                        const {
                            category: {
                                attributes: { label: attr }
                            },
                            'im:image': [{ label: img }],
                            'im:name': { label: name }
                        } = item
                        return (
                            <div className="item" key={item.id.label}>
                                <LazyLoad offsetHorizontal={100} className="imgWrap">
                                    <img className="img" src={img} alt="" />
                                </LazyLoad>
                                <div className="box">
                                    <div className="name txtHi2">{name}</div>
                                    <div className="attr txtHi2">{attr}</div>
                                </div>
                            </div>
                        )
                    })}
                    {list.length === 0 && (<div className="nomal">暂无推荐 ~~</div>)}
                </div>
            </div>
        )
    }
}

export default RecomendList
