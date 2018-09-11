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

    const layout = this.generateLayout(props);
    this.state = { layout, changedItem: null };
    this.background = "white";
  }

  componentWillReceiveProps(nextProps) {
    if (
      (!this.props.selectedNodeType && nextProps.selectedNodeType) ||
      (!this.props.selectedItem && nextProps.selectedItem)
    ) {
      this.setState({
        layout: this.generateLayout(nextProps)
      });
    }
  }

  generateDOM(state, props) {
    let doms = [
      <div
        key={"1"}
        style={{
          background: "transparent",
          textAlign: "center",
          borderRadius: 5,
          zIndex: 100
        }}
      >
        <ItemSelect items={props.items} selectedItem={props.selectedItem} />
      </div>,
      <div
        key={"2"}
        style={{
          background: "transparent",
          textAlign: "center",
          zIndex: 100,
          borderRadius: 5
        }}
      >
        <FunctionSelect />
      </div>,
      <div
        key={"3"}
        style={{
          background: this.background,
          textAlign: "center",
          borderRadius: 10
        }}
      >
        <MacroGraph item={state.layout[2]} />
      </div>,
      <div
        key={"4"}
        style={{
          background: this.background,
          textAlign: "center",
          borderRadius: 10
        }}
      >
        <FunctionGraph
          item={state.layout[3]}
          index={4}
          changedItem={state.changedItem}
          selectedItem={this.props.selectedItem}
        />
      </div>,
      <div
        key={"5"}
        style={{
          background: this.background,
          textAlign: "center",
          borderRadius: 10
        }}
      >
        <DetailView item={state.layout[4]} />
      </div>
    ];
    return doms;
  }

  generateLayout(props) {
    let layout = [
      {
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        i: "1",
        static: false,
        isResizable: false
      },
      {
        x: 1.5,
        y: 0,
        w: 1,
        h: 1,
        i: "2",
        static: false,
        isResizable: false
      },
      {
        x: 0,
        y: 1,
        w: 2,
        h: 4,
        minH: 4,
        i: "3",
        isResizable: true,
        isDraggable: false
      },
      {
        x: 0,
        y: 5,
        w: 1,
        h: props.selectedItem && props.selectedItem.id ? 3 : 1,
        minH: 2,
        i: "4"
      },
      {
        x: 1,
        y: 5,
        w: 1,
        h: props.selectedNodeType ? 3 : 1,
        minH: 2,
        minW: 1,
        i: "5"
      }
    ];
    return layout;
  }

  onLayoutChange(layout) {
    this.setState({
      layout: layout
    });
  }

  itemResized = (layout, oldItem, newItem, placeholder, e, element) => {
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
        {this.generateDOM(this.state, this.props)}
      </ReactGridLayout>
    );
  }
}

export default GridViewLayout;
