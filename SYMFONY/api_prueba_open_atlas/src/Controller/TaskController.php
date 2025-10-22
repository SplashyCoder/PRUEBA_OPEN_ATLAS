<?php

namespace App\Controller;

use App\Entity\Task;
use App\Form\TaskType;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;


#[Route('/task')]
final class TaskController extends AbstractController
{
    #[Route(name: 'app_task_index', methods: ['GET'])]
    public function index(TaskRepository $taskRepository): Response
    {
        return $this->render('task/index.html.twig', [
            'tasks' => $taskRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_task_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $task = new Task();
        $form = $this->createForm(TaskType::class, $task);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($task);
            $entityManager->flush();

            return $this->redirectToRoute('app_task_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('task/new.html.twig', [
            'task' => $task,
            'form' => $form,
        ]);
    }

      #[Route('/api/users/{userId}/tasks', name: 'api_user_tasks', methods: ['GET'])]
    public function getUserTasks(int $userId, TaskRepository $taskRepository): JsonResponse
    {
        $tasks = $taskRepository->findBy(['user' => $userId], ['id' => 'ASC']);
        
        $formattedTasks = [];
        foreach ($tasks as $task) {
            $project = $task->getProject();
            
            // Buscar la tasa del usuario para este proyecto
            $userRate = null;
            foreach ($project->getUserProjectRates() as $rate) {
                if ($rate->getUser()->getId() === $userId) {
                    $userRate = $rate;
                    break;
                }
            }

            $formattedTasks[] = [
                'task_id' => $task->getId(),
                'task_title' => $task->getTitle(),
                'task_status' => $task->getStatus(),
                'project_id' => $project->getId(),
                'project_name' => $project->getName(),
                'hourly_rate' => $userRate ? [
                    'amount' => $userRate->getRate(),
                    'currency' => $userRate->getCurrency()
                ] : null
            ];
        }

        return $this->json([
            'user_id' => $userId,
            'tasks_count' => count($formattedTasks),
            'tasks' => $formattedTasks
        ]);
    }

    #[Route('/{id}', name: 'app_task_show', methods: ['GET'])]
    public function show(Task $task): Response
    {
        return $this->render('task/show.html.twig', [
            'task' => $task,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_task_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Task $task, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(TaskType::class, $task);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_task_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('task/edit.html.twig', [
            'task' => $task,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_task_delete', methods: ['POST'])]
    public function delete(Request $request, Task $task, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$task->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($task);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_task_index', [], Response::HTTP_SEE_OTHER);
    }
}
