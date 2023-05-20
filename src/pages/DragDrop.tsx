import React, { FC, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Box, Container, Grid } from "@mui/material";
import { CompanyService } from "../services/CompanyService";
import useApi from "../utils/api-client/useApi";
import { BGBox } from "../styles";

const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "white",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  minHeight: 100,
  width: 350,
});

const DragDrop: FC = () => {
  const [items, setItems] = useState([{ companyId: "0", companyName: "" }]);
  const [selected, setSelected] = useState([
    { companyId: "0", companyName: "" },
  ]);

  const { fetch: fetchCompanies } = useApi(CompanyService.companies);

  const getData = async () => {
    const { data } = await fetchCompanies();
    setItems(data?.items);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let state: any = {
    items,
    selected,
  };

  const id2List: any = {
    droppable: "items",
    droppable2: "selected",
  };

  const getList = (id: any) => state[id2List[id]];

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const newResult = move(
      getList(source.droppableId),
      getList(destination.droppableId),
      source,
      destination
    );

    setItems(newResult.droppable);
    setSelected(newResult.droppable2);
  };

  return (
    <Container maxWidth="lg">
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={BGBox}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="start"
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {items?.map((item, index) => (
                    <Draggable
                      key={item.companyId}
                      draggableId={item.companyId}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Box
                          sx={{
                            padding: item.companyName ? "10px" : 0,
                            borderRadius: "4px",
                          }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.companyName}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {selected.map((item, index) => (
                    <Draggable
                      key={item.companyId}
                      draggableId={item.companyId}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            padding: item.companyName ? "10px" : 0,
                            borderRadius: "4px",
                          }}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.companyName}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
        </Box>
      </DragDropContext>
    </Container>
  );
};

export default DragDrop;
