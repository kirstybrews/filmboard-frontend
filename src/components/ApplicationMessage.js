import React from 'react';
import { 
    Editable, 
    EditableInput, 
    EditablePreview, 
    Flex, 
    ButtonGroup, 
    IconButton,
    HStack
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
// const APPLICATIONS_URL = 'http://localhost:3000/applications/';
const APPLICATIONS_URL = 'https://filmboard-backend.herokuapp.com/applications/';

const ApplicationMessage = ({ message, id }) => {

    const handleSubmit = (e) => {
        const updatedApp = {
            message: e
        }

        const reqPack = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify(updatedApp)
        }
        fetch(APPLICATIONS_URL + id, reqPack)
            .then(r => r.json())
    }

    function EditableControls({ isEditing, onSubmit, onCancel, onEdit }) {
        return isEditing ? (
          <ButtonGroup  size="sm">
            <IconButton icon={<CheckIcon />} onClick={onSubmit} />
            <IconButton icon={<CloseIcon />} onClick={onCancel} />
          </ButtonGroup>
        ) : (
          <Flex >
            <IconButton size="sm" icon={<EditIcon />} onClick={onEdit} />
          </Flex>
        )
      }
    return (
        <Editable
            defaultValue={message}
            isPreviewFocusable={false}
            submitOnBlur={false}
            onSubmit={handleSubmit}
        >
            {(props) => (
                <HStack>
                    <>
                        <EditablePreview />
                        <EditableInput bg="white"/>
                    </>
                    <EditableControls {...props} />
                </HStack>
            )}
        </Editable>
    )
}

export default ApplicationMessage;