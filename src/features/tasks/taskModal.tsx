import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  selectModalOperation,
  selectModalVisibility,
  selectTaskFromModal
} from "./modalSlice";
import "./taskModal.module.css";
import { postTask, updateTask } from "./taskSlice";

const TaskModal = () => {
  const dispatch = useDispatch();
  const isShowModal = useSelector(selectModalVisibility);
  const modalOperation = useSelector(selectModalOperation);
  const taskFromModal = useSelector(selectTaskFromModal);
  const [task, setTask] = useState(taskFromModal);

  useEffect(() => {
    setTask(taskFromModal);
  }, [taskFromModal]);

  const getOkText = () => {
    switch (modalOperation) {
      case "addition":
        return "Добавить";
      case "editing":
        return "Изменить";
      case "viewing":
      default:
        return "Закрыть";
    }
  };

  return (
    <Modal
      title="Добавление таска в расписание RS School"
      centered={true}
      visible={isShowModal}
      okText={getOkText()}
      cancelText="Отмена"
      onOk={() => {
        switch (modalOperation) {
          case "addition":
            dispatch(postTask(task));
            break;
          case "editing":
            dispatch(updateTask(task));
            break;
          case "viewing":
          default:
            dispatch(hideModal());
        }
      }}
      onCancel={() => dispatch(hideModal())}
    >
      <div className="wrapper">
        <label>Название таска:</label>
        <input
          type="text"
          readOnly={modalOperation === "viewing"}
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
        <label>Время начала:</label>
        <input
          type="text"
          readOnly={modalOperation === "viewing"}
          value={task.dateStart}
          onChange={(e) => setTask({ ...task, dateStart: e.target.value })}
        />
        <label>Время сдачи:</label>
        <input
          type="text"
          readOnly={modalOperation === "viewing"}
          value={task.dateTime}
          onChange={(e) => setTask({ ...task, dateTime: e.target.value })}
        />
        <label>Тип:</label>
        <input
          type="text"
          readOnly={modalOperation === "viewing"}
          value={task.type}
          onChange={(e) => setTask({ ...task, type: e.target.value })}
        />
        <label>Описание:</label>
        <input
          type="text"
          readOnly={modalOperation === "viewing"}
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <label>Ссылка на таск:</label>
        <input
          type="text"
          readOnly={modalOperation === "viewing"}
          value={task.descriptionUrl}
          onChange={(e) => setTask({ ...task, descriptionUrl: e.target.value })}
        />
        <label>Место:</label>
        <input
          type="text"
          readOnly={modalOperation === "viewing"}
          value={task.place}
          onChange={(e) => setTask({ ...task, place: e.target.value })}
        />
        <label>Комментарий:</label>
        <input
          type="text"
          readOnly={modalOperation === "viewing"}
          value={task.comment}
          onChange={(e) => setTask({ ...task, comment: e.target.value })}
        />
        <label>Организатор:</label>
        <input
          type="text"
          readOnly={modalOperation === "viewing"}
          value={task.organizer}
          onChange={(e) => setTask({ ...task, organizer: e.target.value })}
        />
      </div>
    </Modal>
  );
};

export default TaskModal;
