"use client"
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator"
import { PropsWithChildren, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Modal } from "./ui/modal"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { cn } from "@/utils"
import { Button } from "./ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "@/app/lib/client"
import Picker from "@emoji-mart/react";

interface CreateEventCategoryModel extends PropsWithChildren {
    containerClassName?: string
}

const EVENT_CATEGORY_VALIDATOR = z.object({
    name: CATEGORY_NAME_VALIDATOR,
    color: z
        .string()
        .min(1, "Colour is Required")
        .regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
    emoji: z.string().emoji("Invalid emoji format.").optional(),
})

//for adding type safety to our react-hook-form we will be creating type
type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATOR>

const COLOR_OPTIONS = [
    "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
    "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
    "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
    "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
    "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
    "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
    "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
    "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
    "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
    "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
]

const EMOJI_OPTIONS = [
    { emoji: "💰", label: "Money (Sale)" },
    { emoji: "👤", label: "User (Sign-up)" },
    { emoji: "🎉", label: "Celebration" },
    { emoji: "📅", label: "Calendar" },
    { emoji: "🚀", label: "Launch" },
    { emoji: "📢", label: "Announcement" },
    { emoji: "🎓", label: "Graduation" },
    { emoji: "🏆", label: "Achievement" },
    { emoji: "💡", label: "Idea" },
    { emoji: "🔔", label: "Notification" },
]

export const CreateEventCategoryModal = ({
    children,
    containerClassName,
}: CreateEventCategoryModel) => {
    const [isOpen, setIsOpen] = useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const queryClient=useQueryClient();
    const{mutate:createEventCategory , isPending}=useMutation({

        mutationFn:async(data:EventCategoryForm)=>{
await client.category.createEventCategory.$post(data)

           },
           onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["user-event-categories"]
            })
            setIsOpen(false)
           },
    })

    //using react hook form
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<EventCategoryForm>({
        resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
    })

    //basicaly just a getter function to get  the value of color , emoji
    const color = watch("color")
    const selectedEmoji = watch("emoji")

    const handleEmojiSelect = (emoji: any) => {
        setValue("emoji", emoji.native);
        setShowEmojiPicker(false); // Close picker after selection
    };

    const onSubmit = (data: EventCategoryForm) => { 

        createEventCategory(data)
    }

    return (
        <>
            <div className={containerClassName} onClick={() => setIsOpen(true)}>
                {children}
            </div>
            <Modal
                className="max-w-xl p-8"
                showModal={isOpen}
                setShowModal={setIsOpen}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <h2 className=" text-lg/7 font-medium tracking-tight text-gray-950">
                            New Event Category
                        </h2>
                        <p className="text-sm/6 text-gray-600">
                            Create a new category to organize your events.
                        </p>
                    </div>
                    <div className="space-y-5">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                autoFocus
                                id="name"
                                {...register("name")}
                                placeholder="e.g user-signup"
                                className="w-full"
                            />

                            {errors.name ? (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            ) : null}
                        </div>

                        {/* Color platelete */}
                        <div>
                            <Label>Color</Label>
                            <div className="flex flex-wrap gap-3">
                                {COLOR_OPTIONS.map((premadeColor) => (
                                    <button
                                        key={premadeColor}
                                        type="button"
                                        className={cn(
                                            `bg-[${premadeColor}]`,
                                            "size-10 rounded-full ring-2 ring-offset-2  transition-all ",
                                            color === premadeColor
                                                ? "ring-brand-700 scale-110"
                                                : "ring-transparent hover:scale-105"
                                        )}
                                        onClick={() => setValue("color", premadeColor)}
                                    ></button>
                                ))}
                            </div>
                            {errors.color ? (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.color.message}
                                </p>
                            ) : null}
                        </div>

                        <div>
                            <Label>Emoji</Label>
                            <div className="flex flex-wrap gap-3">
                                {EMOJI_OPTIONS.map(({ emoji, label }) => (
                                    <button
                                        key={emoji}
                                        type="button"
                                        className={cn(
                                            "size-10 flex items-center justify-center text-xl  rounded-md transition-all",
                                            selectedEmoji === emoji
                                                ? "bg-brand-100 ring-2 ring-brand-700   scale-110"
                                                : "bg-brand-10 hover:bg-brand-200"
                                        )}
                                        onClick={() => setValue("emoji", emoji)}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                                  <button
                                    type="button"
                                    className="size-10 flex items-center justify-center text-xl bg-gray-200 rounded-md transition-all hover:bg-gray-300"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Stop event propagation
                                        setShowEmojiPicker(!showEmojiPicker)}}
                                >
                                    ➕
                                </button>
                            </div>
                            {showEmojiPicker && (
    <div className=" flex items-center justify-center ">
        <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white shadow-lg rounded-lg   " 
            style={{
                width: "fit-content",
                padding: "10px",
            }}
        >
         <div className="flex justify-end mb-2">
                <button
                    type="button"
                    className="text-sm text-red-500 hover:text-red-600"
                    onClick={() => setShowEmojiPicker(false)}
                >
                   ✖️
                </button>
            </div>
            <Picker onEmojiSelect={handleEmojiSelect} className="flex justify-center items-center" />
        </div>
    </div>
)}
                            {errors.emoji ? (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.emoji.message}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className=" flex justify-end space-x-3   pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {setIsOpen(false)
                                setShowEmojiPicker(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Create Category</Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
