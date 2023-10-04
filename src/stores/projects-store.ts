import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import RowData from '@/models/RowData'
import ProjectService from "@/services/project-service"
import type Project from '@/models/Project'

export const useProjectsStore = defineStore('projectsStore', () => {
    const projects = ref<Project[]>([])
    const projectService = new ProjectService()
    const tableData = ref<RowData<Project>[]>([])
    const selectedCount = computed(() => (tableData.value.filter((row) => row.checked)).length)
    const selectedProjectIds = computed(() => (tableData.value.filter((row) => row.checked).map((row) => row.data.id)))


    watch(projects, (n, o) => {
        tableData.value = projects.value.map((p: Project) => new RowData<Project>(p));
    }, { deep: true })




    function toggleRowChecked(id: number) {
        tableData.value = tableData.value.map((row) =>
            row.data.id == id ? { data: row.data, checked: !row.checked } : row
        );
    }

    function checkAll(b: boolean) {
        tableData.value = tableData.value.map((row) => {
            return { ...row, checked: b };
        });
    }

    async function getAllProjects() {
        projectService.getAllProjects().then((p) => {
            projects.value = p;
        })
    }

    async function addProject(p: Project) {
        await projectService.addProject(p)
        await getAllProjects()
    }

    async function editProject(p: Project) {
        await projectService.editProject(p)
        await getAllProjects();
    }

    async function deleteProjects() {
        selectedProjectIds.value.forEach(async (id) => {
            await projectService.deleteProjects(id as number);
        })
        await getAllProjects();
    }


    return { tableData, selectedCount, getAllProjects, addProject, editProject, deleteProjects, toggleRowChecked, checkAll }
})
