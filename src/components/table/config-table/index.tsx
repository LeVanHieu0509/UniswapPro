import { TableConfig } from "@custom-types/config-table";
import CheckBox from "components/checkbox";
import useClickAway from "hooks/use-click-away";
import { cloneDeep, isNull } from "lodash";
import React, { useCallback, useRef, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";

import IconHamburger from "../icons/hamburger";
import IconSetting from "../icons/setting";
import { ButtonWrapper, CheckBoxWrapper, ConfigTableWrapper, DisplayFieldsWrapper, Header, Item, List } from "./styled";
import { ButtonIcon, ButtonPrimary, ButtonSecondary } from "styles/buttons";

interface ControlProp {
  config: TableConfig[];
  onReset: () => void;
  onChangeConfig: React.Dispatch<React.SetStateAction<TableConfig[]>>;
}

const ConfigTable = ({ config, onChangeConfig, onReset }: ControlProp) => {
  const [showConfig, setShowConfig] = useState(false);
  const [currentConfig, setCurrentConfig] = useState(config);

  const ref = useRef();

  useClickAway(ref, () => {
    setShowConfig(false);
  });

  const onChangeShowAttributes = (index: number, attribute: any) => {
    setCurrentConfig((pre) => {
      const clone = cloneDeep(pre);
      clone[index].show = !attribute.show;
      return clone;
    });
  };

  const handleOnDragEnd = useCallback(
    (result: DropResult) => {
      if (isNull(result.destination)) {
        return;
      }

      const tampAttribute = cloneDeep(currentConfig);
      const [dragItem] = tampAttribute.splice(result.source.index, 1);
      tampAttribute.splice(result.destination.index, 0, dragItem);
      setCurrentConfig(tampAttribute);
    },
    [currentConfig]
  );

  const handleClose = () => {
    setShowConfig(false);
  };

  const handleSave = useCallback(() => {
    onChangeConfig(currentConfig);
    handleClose();
  }, [currentConfig]);

  return (
    <ConfigTableWrapper>
      <ButtonIcon
        onClick={() => {
          setShowConfig(true);
        }}
      >
        <IconSetting />
      </ButtonIcon>
      {showConfig && (
        <DisplayFieldsWrapper ref={ref}>
          <Header>
            <h6 className="h7">Thông tin hiển thị</h6>
            <label className="h8 color-primary" onClick={onReset}>
              Thiết lập lại
            </label>
          </Header>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="table-drag">
              {(provided: DroppableProvided) => (
                <List {...provided.droppableProps} ref={provided.innerRef}>
                  {currentConfig.map((attribute, index) => {
                    return (
                      <Draggable key={attribute.key + index} draggableId={attribute.key + index} index={index}>
                        {(provided: DraggableProvided) => (
                          <Item
                            key={index}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <IconHamburger />
                            <CheckBoxWrapper>
                              <CheckBox
                                label={attribute.label}
                                checked={attribute.show}
                                onChange={() => {
                                  onChangeShowAttributes(index, attribute);
                                }}
                              />
                            </CheckBoxWrapper>
                          </Item>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>

          <ButtonWrapper>
            <ButtonSecondary size="small" onClick={handleClose}>
              Huỷ bỏ
            </ButtonSecondary>
            <ButtonPrimary size="small" onClick={handleSave}>
              Lưu mới
            </ButtonPrimary>
          </ButtonWrapper>
        </DisplayFieldsWrapper>
      )}
    </ConfigTableWrapper>
  );
};

export default ConfigTable;
