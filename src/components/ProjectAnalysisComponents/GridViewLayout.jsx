import React from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import RGL, { WidthProvider } from "react-grid-layout";

// grid parts
import FunctionGraph from "./FunctionGraph.jsx";
import ItemSelect from "./ItemSelect.jsx";
import FunctionSelect from "./FunctionSelect.jsx";
import DetailView from "./DetailView.jsx";
import MacroGraph from "./MacroGraph.jsx";

const ReactGridLayout = WidthProvider(RGL);

class GridViewLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 3,
    rowHeight: 150,
    onLayoutChange: function() {},
    cols: 2
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout, changedItem: null };
    this.background = "white";
  }

  generateDOM = state => {
    return [
      <div
        key={"1"}
        style={{ background: this.background, textAlign: "center" }}
      >
        <ItemSelect />
      </div>,
      <div
        key={"2"}
        style={{ background: this.background, textAlign: "center" }}
      >
        <FunctionSelect />
      </div>,
      <div
        key={"3"}
        style={{ background: this.background, textAlign: "center" }}
      >
        <MacroGraph item={state.layout[2]} />
      </div>,
      <div
        key={"4"}
        style={{ background: this.background, textAlign: "center" }}
      >
        <FunctionGraph
          item={state.layout[3]}
          index={4}
          changedItem={state.changedItem}
        />
      </div>,
      <div
        key={"5"}
        style={{ background: this.background, textAlign: "center" }}
      >
        <DetailView />
      </div>
    ];
  };

  generateLayout() {
    return [
      {
        x: 0,
        y: 0,
        w: 0.5,
        h: 0.5,
        i: "1",
        static: true
      },
      {
        x: 1.5,
        y: 0,
        w: 0.5,
        h: 0.5,
        i: "2",
        static: true
      },
      {
        x: 0,
        y: 1,
        w: 2,
        h: 4,
        i: "3"
      },
      {
        x: 0,
        y: 5,
        w: 1,
        h: 3,
        i: "4"
      },
      {
        x: 1,
        y: 5,
        w: 1,
        h: 3,
        i: "5"
      }
    ];
  }

  onLayoutChange(layout) {
    this.setState({
      layout: layout
    });
  }

  itemResized = (layout, oldItem, newItem, placeholder, e, element) => {
    console.log(layout);
    console.log(oldItem);
    console.log(newItem);
    console.log(placeholder);
    this.setState({
      layout: layout,
      changedItem: Number(newItem.i)
    });
  };

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        onResizeStop={this.itemResized}
        {...this.props}
      >
        {this.generateDOM(this.state)}
      </ReactGridLayout>
    );
  }
}

export default GridViewLayout;
