import ModalWindowTask from '../../Modal/ModalWindowTask';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../../../axiosClient';

const CourseCreateLessonTask = ({
  index,
  currentLesson,
  updateTaskID,
  slugBindTask,
  setSlugBindTask,
}) => {
  const { lang, username } = useParams();

  const [openModalTask, setOpenModalTask] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateTaskData = () => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/task-from-user`)
      .then(({ data }) => {
        setModalData(data.tasks);
        setIsLoading(false);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    updateTaskData();
  }, []);

  useEffect(() => {
    if (!isLoading && currentLesson.challenge_id !== null) {
      setSlugBindTask(modalData.filter((item) => item.id === currentLesson.challenge_id)[0].slug);
    }
  }, [isLoading]);

  const canBeViewData = (item, i) => {
    return item.date_of_publication !== null;
  };

  return (
    <>
      <div className="course-create-block-buttons__task">
        <Link
          className={'btn secondary-blue big'}
          style={{ pointerEvents: slugBindTask === null ? 'none' : 'auto' }}
          to={`${lang === undefined ? '/' : '/' + lang + '/'}task/${slugBindTask}`}
          target={'_blank'}
        >
          Перейти к задаче
        </Link>
        <button onClick={() => setOpenModalTask(true)} className={'btn underline-hover'}>
          Привязать задачу
        </button>
      </div>
      <ModalWindowTask
        isOpen={openModalTask}
        setIsOpen={(e) => setOpenModalTask(e)}
        bindData={currentLesson.challenge_id}
        setBindData={(id, slug) => updateTaskID(id, slug)}
        data={modalData}
        updateData={() => updateTaskData()}
        canBeViewData={(item, i) => canBeViewData(item, i)}
        linkToData={'task'}
        linkToNewData={`profile/${username}/task-creation`}
        bindText={'Привязать задачу'}
        unBindText={'Отвязать задачу'}
        titleText={'Привязка задачи к уроку №' + index}
        rejectLoadText={'Задачи отсутствуют'}
        successBindText={'Задача успешно привязана'}
        rejectBindText={'Задача не привязана'}
        updateText={'Обновить'}
        newDataText={'Создать новую задачу'}
      />
    </>
  );
};

export default CourseCreateLessonTask;
