import React from 'react'
import { ListView, PullToRefresh } from 'antd-mobile'
import { connect } from 'react-redux'
import LazyLoad from 'react-lazy-load';
import Star from './star'
import $api from '@/api/api'
import SearchList from '@/utils/search'

import './proList.scss'

class ProList extends React.Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })
        this.onEndReached = this.onEndReached.bind(this)
        this.search = new SearchList()
        this.pageIndex = 0
        this.rData = []
        this.state = {
            dataSource,
            isLoading: true,
            hasMore: false,
            params: ``,
            listSource: [],
        }
    }

    componentDidMount() {
        $api.getListData().then(res => {
            let {
                feed: { entry }
            } = res
            entry = this.search.changeData(entry)
            this.setState(
                {
                    listSource: entry,
                    isLoading: false
                },
                () => {
                    this.getList()
                }
            )
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource !== this.props.dataSource) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource)
            })
        }
        if (JSON.stringify(nextProps.searchPrams) !== JSON.stringify(this.props.searchPrams)) {
            this.pageIndex = 0
            this.setState({
                params: nextProps.searchPrams
            }, () => {
                this.getList()
            })
        }
    }

    // 模拟搜索
    searProList(page = 1, rows = 10) {
        const { listSource, params } = this.state
        let pageStart = 0, data = [...listSource]
        if (page === 1) {
            pageStart = 0
        } else {
            pageStart = (page - 1) * rows
        }
        if (params) {
            data = this.search.search(params, data).getShowList()
        }
        data = data.slice(pageStart, pageStart + rows)
        return data
    }

    // 执行搜索列表
    getList() {
        const { listSource } = this.state
        this.setState({ isLoading: true })
        setTimeout(() => {
            this.rData = this.pageIndex ? this.rData : []
            this.rData = [...this.rData, ...this.searProList(++this.pageIndex)]
            if (this.rData.length >= listSource.length) {
                this.rData.length = listSource.length
            }
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
                refreshing: false,
                hasMore: !this.rData.length || this.rData.length >= listSource.length
            })
        }, 300)
    }

    onEndReached() {
        const { hasMore } = this.state
        if (hasMore) {
            return
        }
        this.getList()
    }

    // 刷新
    onRefresh() {
        this.setState({ refreshing: true })
        this.getList()
    }

    render() {
        const { isLoading, dataSource, refreshing } = this.state
        const row = (rowData, sectionID, rowID) => {
            const {
                category: {
                    attributes: { label: attr }
                },
                'im:image': [{ label: img }],
                'im:name': { label: name }
            } = rowData
            return (
                <div key={rowID} className="itemWrap">
                    <div className="item">
                        <div className="num">{rowID - 0 + 1}</div>
                        <LazyLoad offsetVertical={300} className="imgWrap">
                            <img className="img" src={img} alt="" />
                        </LazyLoad>
                        <div className="box">
                            <div className="name txtHi">{name}</div>
                            <div className="attr txtHi">{attr}</div>
                            <div className="starWrap">
                                <Star star={parseInt(Math.random() * 10)} />（
                                {parseInt(Math.random() * 1000)}）
                            </div>
                        </div>
                    </div>
                    <div className="hr"></div>
                </div>
            )
        }
        return (
            <div id="proList">
                <ListView
                    ref={el => (this.lv = el)}
                    dataSource={dataSource}
                    renderFooter={() => (
                        <div className="loadingClass">
                            {isLoading && '加载中...'}
                            {!isLoading && '没有更多数据啦 ~~ '}
                        </div>
                    )}
                    renderRow={row}
                    className="am-list"
                    pullToRefresh={
                        <PullToRefresh refreshing={refreshing} onRefresh={this.onRefresh} />
                    }
                    onEndReached={this.onEndReached}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { sear: { searchPrams } } = state
    return {
        searchPrams
    }
}

export default connect(mapStateToProps)(ProList)