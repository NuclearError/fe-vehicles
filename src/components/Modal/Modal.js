/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, {
  useState, useEffect, useRef, useCallback
} from 'react';

import './style.scss';

const focusableElementSelectors = 'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

export const Modal = ({
  id,
  visible: initialVisibility,
  labelledBy,
  describedBy,
  onCloseModal,
  previouslyFocusedElement,
  children,
}) => {
  const [visible, setVisible] = useState(initialVisibility);
  const [focusPosition, setFocusPosition] = useState(-1);
  const [focusableElements, setFocusableElements] = useState([]);
  const modalRef = useRef(null);

  const setAbilityToScroll = useCallback((isModalVisible) => {
    document.body.classList.toggle('body--modalVisible', isModalVisible);
  }, []);

  useEffect(() => {
    if (modalRef.current) {
      const nodeList = modalRef.current.querySelectorAll(focusableElementSelectors);
      const focusableElementsList = Array.from(nodeList);
      setFocusableElements(focusableElementsList);
      if (focusableElementsList.length > 0) {
        focusableElementsList[0].focus(); // Focus on the first focusable element inside the modal
      }
    }
    setAbilityToScroll(visible);
  }, []);

  const updateFocusState = useCallback((newFocusPosition) => {
    setFocusPosition(newFocusPosition);
    focusableElements[newFocusPosition]?.focus();
  }, [focusableElements]);

  const closeModal = useCallback(() => {
    setVisible(false);
    previouslyFocusedElement.focus();
    setAbilityToScroll(false);
    onCloseModal();
  }, [setAbilityToScroll]);

  const handleKeyUp = useCallback((event) => {
    const keyActions = {
      Tab: () => {
        event.preventDefault();
        const newPosition = event.shiftKey
          ? (focusPosition - 1 + focusableElements.length) % focusableElements.length
          : (focusPosition + 1) % focusableElements.length;
        updateFocusState(newPosition);
      },
      ArrowUp: () => {
        event.preventDefault();
        const newPosition = (focusPosition - 1 + focusableElements.length) % focusableElements.length;
        updateFocusState(newPosition);
      },
      ArrowDown: () => {
        event.preventDefault();
        const newPosition = (focusPosition + 1) % focusableElements.length;
        updateFocusState(newPosition);
      },
      Escape: closeModal,
    };

    if (keyActions[event.key]) {
      keyActions[event.key](event);
    }
  }, [focusPosition, focusableElements, updateFocusState, closeModal]);

  useEffect(() => {
    if (visible) {
      document.addEventListener('keyup', handleKeyUp, true);
    }

    return () => {
      document.removeEventListener('keyup', handleKeyUp, true);
    };
  }, [visible, handleKeyUp]);

  const onClickOutside = useCallback((event) => {
    if (!modalRef.current?.contains(event.target)) {
      closeModal();
    }
  }, [closeModal]);

  if (!visible) {
    return null;
  }

  return (
    <div className="Modal__Background" onClick={onClickOutside} role="presentation">
      <div
        id={id}
        className="Modal__Body"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        ref={modalRef}
      >
        <button className="Modal__CloseButton" type="button" aria-label="Close modal" onClick={closeModal} />
        <div className="Modal__Content">
          {children}
        </div>
      </div>
    </div>
  );
};
