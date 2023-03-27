import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [staffno, setStaffno] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (type === 'update' && todo) {
      setName(todo.name);
      setStaffno(todo.staffno);
      setDate(todo.date);
    } else {
      setName('');
      setStaffno('');
      setDate('');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '') {
      toast.error('Please enter a staff name');
      return;
    }
    if (staffno === '') {
      toast.error('Please enter staff number');
      return;
    }
    if (date === '') {
      toast.error('Please enter a staff birth date');
      return;
    }
    if (name && staffno && date) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            name,
            staffno,
            date,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Employee added successfully');
      }
      if (type === 'update') {
        if (
          todo.name !== name ||
          todo.staffno !== staffno ||
          todo.date !== date
        ) {
          dispatch(updateTodo({ ...todo, name, staffno, date }));
          toast.success('Task Updated successfully');
        } else {
          toast.error('No changes made');
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    // <AnimatePresence>
    <div>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add' : 'Update'} TODO
              </h1>
              <label htmlFor="title">
                Name
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label htmlFor="staffno">
                Staffno
                <input
                  type="text"
                  id="staffno"
                  value={staffno}
                  onChange={(e) => setStaffno(e.target.value)}
                />
              </label>
              <label htmlFor="date">
                Birthdate
                <input
                  type="date"
                  id="title"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Employee' : 'Update Employee'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default TodoModal;
