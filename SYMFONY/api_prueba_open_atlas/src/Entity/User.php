<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 250)]
    private ?string $name = null;

    #[ORM\Column(length: 250)]
    private ?string $email = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    /**
     * @var Collection<int, UserProjectRate>
     */
    #[ORM\OneToMany(targetEntity: UserProjectRate::class, mappedBy: 'user')]
    private Collection $userProjectRates;

    public function __construct()
    {
        $this->userProjectRates = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return Collection<int, UserProjectRate>
     */
    public function getUserProjectRates(): Collection
    {
        return $this->userProjectRates;
    }

    public function addUserProjectRate(UserProjectRate $userProjectRate): static
    {
        if (!$this->userProjectRates->contains($userProjectRate)) {
            $this->userProjectRates->add($userProjectRate);
            $userProjectRate->setUser($this);
        }

        return $this;
    }

    public function removeUserProjectRate(UserProjectRate $userProjectRate): static
    {
        if ($this->userProjectRates->removeElement($userProjectRate)) {
            // set the owning side to null (unless already changed)
            if ($userProjectRate->getUser() === $this) {
                $userProjectRate->setUser(null);
            }
        }

        return $this;
    }
}
