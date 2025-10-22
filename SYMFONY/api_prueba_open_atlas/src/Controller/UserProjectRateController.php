<?php

namespace App\Controller;

use App\Entity\UserProjectRate;
use App\Form\UserProjectRateType;
use App\Repository\UserProjectRateRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/user/project/rate')]
final class UserProjectRateController extends AbstractController
{
    #[Route(name: 'app_user_project_rate_index', methods: ['GET'])]
    public function index(UserProjectRateRepository $userProjectRateRepository): Response
    {
        return $this->render('user_project_rate/index.html.twig', [
            'user_project_rates' => $userProjectRateRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_user_project_rate_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $userProjectRate = new UserProjectRate();
        $form = $this->createForm(UserProjectRateType::class, $userProjectRate);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($userProjectRate);
            $entityManager->flush();

            return $this->redirectToRoute('app_user_project_rate_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('user_project_rate/new.html.twig', [
            'user_project_rate' => $userProjectRate,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_user_project_rate_show', methods: ['GET'])]
    public function show(UserProjectRate $userProjectRate): Response
    {
        return $this->render('user_project_rate/show.html.twig', [
            'user_project_rate' => $userProjectRate,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_user_project_rate_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, UserProjectRate $userProjectRate, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(UserProjectRateType::class, $userProjectRate);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_user_project_rate_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('user_project_rate/edit.html.twig', [
            'user_project_rate' => $userProjectRate,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_user_project_rate_delete', methods: ['POST'])]
    public function delete(Request $request, UserProjectRate $userProjectRate, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$userProjectRate->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($userProjectRate);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_user_project_rate_index', [], Response::HTTP_SEE_OTHER);
    }
}
