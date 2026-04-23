'use client'

import React from 'react'
import { Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import FormTextField from './FormTextField'
import type { GridItemProps } from '@/components/ui/Grid/GridItem'
import { useFormContext } from 'react-hook-form'
import Typography from '@/components/ui/typography'
import GridItem from '@/components/ui/Grid/GridItem'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface TimeRangeFieldProps {
  name: string
  label: string
  required?: boolean
  size?: GridItemProps['size']
}

const TimeRangeField = ({
  name,
  label,
  size = 12,
  ...props
}: TimeRangeFieldProps) => {
  const { setValue, getValues } = useFormContext()
  const shiftTime = getValues(name).split(' - ')
  const [startTime, setStartTime] = React.useState(shiftTime[0] || '')
  const [endTime, setEndTime] = React.useState(shiftTime[1] || '')

  React.useEffect(() => {
    if (startTime !== '' && !endTime) {
      setValue(name, `${startTime}`, { shouldValidate: true })
    } else if (startTime && endTime) {
      setValue(name, `${startTime} - ${endTime}`, { shouldValidate: true })
    }
  }, [startTime, endTime, name, setValue])

  const handleTimeChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(value)
  }

  return (
    <GridItem className="p-0" size={size}>
      <Popover>
        <PopoverTrigger className="w-full outline-none text-left">
          <FormTextField
            name={name}
            label={label}
            size={size ?? 12}
            {...props}
            endIcon={{
              icon: Clock,
            }}
            readOnly
          />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="bg-white py-4 border border-primary rounded-md w-80"
        >
          <div className="flex flex-col items-center z-50">
            <Typography className="text-lg text-primary font-medium">
              Shift Time
            </Typography>
            <hr className="w-full bg-primary mb-4 mt-2 h-0.5" />
            <div className="flex items-center gap-3">
              <Input
                type="time"
                id="start-time"
                value={startTime}
                onChange={(e) => handleTimeChange(e.target.value, setStartTime)}
                className="w-32 py-1"
              />
              <span className="text-lg">-</span>
              <Input
                type="time"
                id="end-time"
                value={endTime}
                onChange={(e) => {
                  handleTimeChange(e.target.value, setEndTime)
                }}
                className="w-32 py-1"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </GridItem>
  )
}

export default TimeRangeField
