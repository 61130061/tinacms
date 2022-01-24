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

import React, { Fragment } from 'react'
import { PlusIcon, HeadingIcon, ToolbarIcon } from '../icons'
import { Popover, Transition } from '@headlessui/react'
import { useEditorState } from '@udecode/plate-core'
import { insertMDX } from '../../create-mdx-plugins'
import { LinkForm } from '../../create-link-plugin'
import { classNames } from '../helpers'

import type { PlateEditor } from '@udecode/plate-core'
import type { MdxTemplate } from '../../../types'
import { insertImg } from '../../create-img-plugin'

export type ToolbarItemType = {
  label: string
  name: string
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  options?: JSX.Element[]
  active: boolean
  inlineOnly?: boolean
}

export const ToolbarItem = ({
  hidden,
  label,
  active,
  onMouseDown,
  icon,
  options,
}: {
  label: string
  hidden?: boolean
  active?: boolean
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  icon: string
  options?: {}[]
}) => {
  const editor = useEditorState()!
  const [selection, setSelection] = React.useState(null)

  React.useEffect(() => {
    if (editor.selection) {
      setSelection(editor.selection)
    }
  }, [JSON.stringify(editor.selection)])

  const [isExpanded, setIsExpanded] = React.useState(false)
  if (options) {
    return (
      <Popover as="div" className="relative z-10 w-full">
        <Popover.Button
          as="span"
          className="cursor-pointer w-full inline-flex justify-center items-center px-2 py-2 rounded-l-md border-t border-l border-b border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          onMouseDown={(e) => {
            e.preventDefault()
          }}
        >
          <span className="sr-only">Open options</span>
          <HeadingIcon />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="origin-top-left absolute left-0 mt-2 -mr-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-2 prose">{options}</div>
          </div>
        </Transition>
      </Popover>
    )
  }
  if (icon === 'image') {
    return (
      <span className="relative">
        <button
          type="button"
          className={classNames(
            active ? 'bg-gray-50 text-blue-500' : 'bg-white text-gray-600',
            'w-full inline-flex relative justify-center items-center px-2 py-2 border-t border-b border-gray-200 text-sm font-medium  hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
          )}
          style={{
            visibility: hidden ? 'hidden' : 'visible',
            pointerEvents: hidden ? 'none' : 'auto',
          }}
          onClick={(e) => {
            e.preventDefault()
            insertImg(editor)
          }}
        >
          <span className="sr-only">{label}</span>
          <ToolbarIcon name={icon} />
        </button>
      </span>
    )
  }
  if (icon === 'link') {
    return (
      <span className="relative">
        <button
          type="button"
          className={classNames(
            active ? 'bg-gray-50 text-blue-500' : 'bg-white text-gray-600',
            'w-full inline-flex relative justify-center items-center px-2 py-2 border-t border-b border-gray-200 text-sm font-medium  hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
          )}
          style={{
            visibility: hidden ? 'hidden' : 'visible',
            pointerEvents: hidden ? 'none' : 'auto',
          }}
          onClick={(e) => {
            e.preventDefault()
            setIsExpanded((isExpanded) => !isExpanded)
          }}
        >
          <span className="sr-only">{label}</span>
          <ToolbarIcon name={icon} />
        </button>

        {isExpanded && (
          <LinkForm
            selection={selection}
            onClose={(e) => {
              setIsExpanded(false)
            }}
            onChange={(v) => console.log(v)}
          />
        )}
      </span>
    )
  }

  return (
    <button
      type="button"
      className={classNames(
        active ? 'bg-gray-50 text-blue-500' : 'bg-white text-gray-600',
        'w-full inline-flex relative justify-center items-center px-2 py-2 border-t border-b border-gray-200 text-sm font-medium  hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
      )}
      style={{
        visibility: hidden ? 'hidden' : 'visible',
        pointerEvents: hidden ? 'none' : 'auto',
      }}
      onMouseDown={onMouseDown}
    >
      <span className="sr-only">{label}</span>
      <ToolbarIcon name={icon} />
    </button>
  )
}

export const EmbedButton = ({
  editor,
  templates,
}: {
  editor: PlateEditor
  templates: MdxTemplate[]
}) => {
  return (
    <Popover
      as="span"
      className="relative z-10 block"
      style={{ width: '85px' }}
    >
      <Popover.Button
        as="span"
        onMouseDown={(e) => {
          e.preventDefault()
        }}
        className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-blue-500 bg-blue-500 text-sm font-medium text-white hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <span className="text-sm font-semibold tracking-wide align-baseline mr-1">
          Embed
        </span>
        <PlusIcon />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2">
            {templates.map((template) => (
              <button
                key={template.name}
                type="button"
                onClick={() => {
                  insertMDX(editor, template)
                }}
                className={classNames(
                  'hover:bg-gray-100 hover:text-gray-900 block px-4 py-2 text-sm w-full text-left'
                )}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
      </Transition>
    </Popover>
  )
}
