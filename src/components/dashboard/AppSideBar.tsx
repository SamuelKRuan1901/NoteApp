'use client';
import { ChevronDown, Scroll } from 'lucide-react';
import { sidebarItems } from '@/lib/menuItems';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { useContext, useEffect, useState } from 'react';
import { NoteContext } from '@/contexts/NoteContext';
import { getNotes } from '@/actions/notes';
import { Note } from '@/lib/types';
import { redirect, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

export function AppSidebar() {
  const { setChosen, chosen, chosenMenuElement, setChosenMenuElement } =
    useContext(NoteContext);
  const path = usePathname();
  const pathName = path.split('/');
  const [tags, setTags] = useState<string[]>([]);
  const handleChoseTag = (tag: string) => {
    try {
      setChosen(tag);
      setChosenMenuElement('Tags');
    } catch (error) {
      toast.error(error as string);
    } finally {
      if (pathName.includes('settings')) redirect('/dashboard');
    }
  };
  const handleChoseElement = (element: string) => {
    setChosenMenuElement(element);
    if (element === 'Settings') {
      redirect('/dashboard/settings');
    } else {
      redirect('/dashboard');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getNotes();
        const uniqueTags = [
          ...new Set(result?.flatMap((note: Note) => note.tags) ?? [])
        ];
        setTags(uniqueTags as string[]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Sidebar variant='sidebar' className='pb-4'>
      <SidebarHeader>
        <div className='flex items-center justify-center gap-1 p-2'>
          <Scroll size={30} />
          <h1 className='text-xl font-semibold'>Note</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible
                defaultOpen
                className='group/collapsible flex flex-col space-y-3'
              >
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.title === 'Tags' && (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            className='hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer'
                          >
                            <div
                              className={`flex items-center justify-between
                                ${
                                  chosenMenuElement === item.title
                                    ? 'bg-slate-200 dark:bg-slate-700'
                                    : ''
                                }`}
                              onClick={() => handleChoseElement(item.title)}
                            >
                              <span className='flex items-center gap-x-2'>
                                <item.icon size={15} />
                                <span>{item.title}</span>
                              </span>
                              <ChevronDown />
                            </div>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {tags.map((tag) => (
                              <SidebarMenuSubItem key={tag}>
                                <SidebarMenuButton
                                  asChild
                                  className='hover:bg-slate-200 dark:hover:bg-slate-700'
                                >
                                  <div
                                    className={`cursor-pointer ${
                                      chosen === tag
                                        ? 'bg-slate-200 dark:bg-slate-700'
                                        : ''
                                    }`}
                                    onClick={() => handleChoseTag(tag)}
                                  >
                                    {tag}
                                  </div>
                                </SidebarMenuButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    )}
                    {item.title !== 'Tags' && (
                      <SidebarMenuButton
                        asChild
                        className='hover:bg-slate-200 dark:hover:bg-slate-700'
                      >
                        <div
                          // href={item.url}
                          className={`cursor-pointer ${
                            chosenMenuElement === item.title
                              ? 'bg-slate-200 dark:bg-slate-700'
                              : ''
                          }`}
                          onClick={() => handleChoseElement(item.title)}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
