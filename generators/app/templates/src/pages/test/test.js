import React from "react";
import { SearchBar } from "antd-mobile";
import { connect } from "react-redux";
import $api from "@/api/api";
import ProList from "@/components/proList";
import RecomendList from "@/components/recomendList";
import SearchList from "@/utils/search";
import { searActions } from "@/store/actions";
import "./test.scss";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.search = new SearchList();
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      recomendSource: [],
      recomend: []
    };
  }

  componentDidMount() {
    $api.getRecomendData().then(res => {
      let {
        feed: { entry }
      } = res;
      entry = this.search.changeData(entry);
      this.setState({
        recomendSource: entry,
        recomend: entry
      });
    });
  }

  onSubmit(e) {
    const { recomendSource } = this.state;
    const { dispatch } = this.props;
    dispatch(searActions(e));
    this.setState({
      searchPrams: e,
      recomend: this.search.search(e, recomendSource).getShowList()
    });
  }

  render() {
    const { recomend, searchPrams } = this.state;
    return (
      <div id="index">
        <SearchBar
          placeholder="搜尋"
          className="sub-title"
          onSubmit={this.onSubmit}
          ref={ref => (this.autoFocusInst = ref)}
        />
        <div className="hr"></div>
        <section className="recom">
          <div className="recomTit">推介</div>
          <RecomendList list={recomend}></RecomendList>
          <div className="hr" style={{ height: 1 }}></div>
        </section>
        <ProList></ProList>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    sear: { searchPrams }
  } = state;
  return {
    searchPrams
  };
};

export default connect(mapStateToProps)(Index);
