/**

Copyright 2021 Forestry.io Holdings, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import React from 'react'
import { useFormPortal, FormBuilder } from '../../../../../form-builder'
import { PanelHeader, GroupPanel } from '../../../GroupFieldPlugin'
import { Form, Field } from '../../../../../forms'

export const NestedFormInner = (props: {
  onClose: () => void
  id: string
  label: string
  fields: Field[]
  initialValues: object
  onChange: (values: object) => void
}) => {
  const FormPortal = useFormPortal()
  const form = React.useMemo(() => {
    return new Form({
      ...props,
      onChange: ({ values }) => {
        props.onChange(values)
      },
      onSubmit: () => {},
    })
  }, [])
  return (
    <FormPortal>
      {({ zIndexShift }) => (
        <GroupPanel isExpanded={true} style={{ zIndex: zIndexShift + 1000 }}>
          <PanelHeader onClick={props.onClose}>{props.label}</PanelHeader>
          <FormBuilder form={form} hideFooter={true} />
        </GroupPanel>
      )}
    </FormPortal>
  )
}
