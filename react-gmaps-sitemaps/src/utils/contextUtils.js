import axios from "axios";

export let addNode = {
  value: "/0+",
  label: (
    <sup style={{ color: "blue" }}>
      <small>ADD NEW</small>
    </sup>
  ),
  parent: null,
  apiPath: "HI/there",
  latLngArr: ["0", "0"],
  nodeType: "ADD",
  icon: <i className={`material-icons icon-${"blue"}`}>{"control_point"}</i>,
  disabled: true,
};

export const changeIcons = (nodes) => {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].icon = (
      <i className={`material-icons icon-${nodes[i].color}`}>
        {nodes[i].iconValue}
      </i>
    );
    for (let j = 0; j < nodes[i].children.length; j++) {
      nodes[i].children[j].icon = (
        <i className={`material-icons icon-${nodes[i].children[j].color}`}>
          {nodes[i].children[j].iconValue}
        </i>
      );
    }
  }
};

export const findNode = (nodeValue, nodes) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].value === nodeValue) {
      return nodes[i];
    }
    if (nodes[i].children !== undefined) {
      for (let j = 0; j < nodes[i].children.length; j++) {
        if (nodes[i].children && nodes[i].children[j].value === nodeValue) {
          return nodes[i].children[j];
        }
      }
    }
  }
  return null;
};

export const changeNodeIcons = (node) => {
  // console.log("NODEINPROGRESS", node);
  let newNode = node;
  newNode.icon = (
    <i className={`material-icons icon-${node.color}`}>{node.iconValue}</i>
  );
  if (newNode.isDir && newNode.parent === null) {
    for (let i = 0; i < newNode.children.length; i++) {
      let child = newNode.children[i];
      child.icon = (
        <i className={`material-icons icon-${child.color}`}>
          {child.iconValue}
        </i>
      );
      newNode.children[i] = child;
    }
    newNode.children.unshift({
      value: newNode.value + "/1+",
      label: (
        <sup style={{ color: "blue" }}>
          <small>ADD NEW</small>
        </sup>
      ),
      latLngArr: ["0", "0"],
      nodeType: "ADD",
      icon: (
        <i className={`material-icons icon-${"blue"}`}>{"control_point"}</i>
      ),
      disabled: true,
    });
  }
  return newNode;
};

export const replaceNode = (nodeId, updatedNode, nodes) => {
  let newNodes = [...nodes];
  for (let i = 0; i < newNodes.length; i++) {
    if (newNodes[i].id === nodeId) {
      newNodes[i] = changeNodeIcons(updatedNode);
      return newNodes;
    }
  }
};

export const removeNode = (nodeValue, nodes) => {
  let newNodes = [...nodes];
  for (let i = 0; i < newNodes.length; i++) {
    if (newNodes[i].children !== undefined) {
      newNodes[i].children = newNodes[i].children.filter(
        (child) => child.value !== nodeValue
      );
    }
  }
  return newNodes.filter((node) => node.value !== nodeValue);
};

export const editCleanup = (
  data,
  checked,
  shapes,
  selected,
  setChecked,
  setShapes,
  setSelected,
  setIcon,
  setColor,
  setNodeType,
  setDescription,
  setEditValue
) => {
  if (data !== null) {
    let newChecked = checked.filter((node) => node !== selected.value);
    newChecked.push(data.value);
    setChecked(newChecked);
    let newShapes = shapes.filter((node) => node.value !== selected.value);
    newShapes.push(data);
    setShapes(newShapes);
  }
  setSelected(null);
  setIcon("search");
  setColor("black");
  setDescription("");
  setNodeType(null);
  setEditValue("");
};

export const updateNodes = (profileId, setNodes, setTeams) => {
  axios
    .get(`https://backend-mapdit.herokuapp.com/api/profiles/${profileId}`)
    .then((res) => {
      let pteams = res.data.teams;
      let profileNodes = [];
      let profileTeams = [];
      // console.log("DATA", res.data);
      for (let team of pteams) {
        profileTeams.push({
          id: team.id,
          name: team.name,
          unique_key: team.unique_key,
        });
        for (let node of team.nodes) {
          profileNodes.push(node);
        }
      }
      setTeams(profileTeams);
      // this removes duplicate nodes, is basically a set for objects
      let newNodes = [...new Set(profileNodes.map(JSON.stringify))].map(
        JSON.parse
      );
      // console.log("newNodes", newNodes);
      changeIcons(newNodes);
      for (let i = 0; i < newNodes.length; i++) {
        if (newNodes[i].isDir) {
          newNodes[i].children.unshift({
            value: newNodes[i].value + "/1+",
            label: (
              <sup style={{ color: "blue" }}>
                <small>ADD NEW</small>
              </sup>
            ),
            latLngArr: ["0", "0"],
            nodeType: "ADD",
            icon: (
              <i className={`material-icons icon-${"blue"}`}>
                {"control_point"}
              </i>
            ),
            disabled: true,
          });
        }
      }
      newNodes.unshift(addNode);
      setNodes(newNodes);
    })
    .catch((err) => console.log(err));
};
